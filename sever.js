require("dotenv").config("./env");
// require("./config/passport");
const express = require("express");
const app = express();
const logger = require("morgan");
const path = require("path");
const expresshandlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const request = require("request");
const flash = require("connect-flash");
const { Pay } = require("./models/pay");
const { initializePayment, verifyPayment } = require("./config/paystack")(request);
const _ = require('lodash')



const mongoose = require("mongoose");

const mongoStore = require("connect-mongo")(session);
// DataBase connections
mongoose.promise = global.promise;
const MONGO_URL = require("./config/db").MONGOURL;
mongoose
  .connect(MONGO_URL, { useNewUrlParser: true })
  .then(() => console.log(`Database connected at ${MONGO_URL}`))
  .catch(err => console.log(`Database Connection failed ${err.message}`));

const port = process.env.PORT;
app.engine(
  ".hbs",
  expresshandlebars({
    defaultLayout: "layout",
    extname: ".hbs"
  })
);
app.set("view engine", ".hbs");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//more middlewares

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.use(
  session({
    secret: "catx",
    resave: false,
    saveUninitialized: false,
    store: new mongoStore({ mongooseConnection: mongoose.connection }),
    cookie: {
      maxAge: 180 * 60 * 1000
    }
  })
);

// Setup flash/ Environmental variables
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_messages = req.flash("success");
  res.locals.error_messages = req.flash("error");
  res.locals.user = req.user ? true : false;
  res.locals.session = req.session;
  next();
});

// payapp route
app.use("/users", require("./routes/payapp"));
app.use("/", require("./routes/index"));
app.use("/user", require("./routes/user"))

// app.use("/interns", require("./routes/interns"))
//admin route

//paystack
app.get("/pay", (req, res) => {
  res.render("payer/pay");
});

app.post("/paystack/pay", (req, res) => {
  const form = _.pick(req.body, ["amount", "email", "fullName"]);
  console.log("Data", form);
  form.metadata = {
    full_name: form.fullName
  };
  form.amount *= 100;

  initializePayment(form, (error, body) => {
    if (error) {
      //         //handle errors
      console.log(error);
      return res.redirect("/error");
      return;
    }
    response = JSON.parse(body);
    // console.log("RES", response.data);
    res.redirect(response.data.authorization_url);
  });
});

app.get("/paystack/callback", (req, res) => {
  const ref = req.query.reference;
  verifyPayment(ref, (error, body) => {
    if (error) {
      //handle errors appropriately
      console.log(error);
      return res.redirect("/error");
    }
    response = JSON.parse(body);

    const data = _.at(response.data, [
      "reference",
      "amount",
      "customer.email",
      "metadata.fullName"
    ]);

    [reference, amount, email, fullName] = data;

    newPay = { reference, amount, email, fullName };

    const pay = new Pay(newPay);

    pay.save().then(pay => {
        if (!pay) {
          return res.redirect("/error");
        }
        res.redirect("/receipt/" + pay._id);
      })
      .catch((e) => {
        // res.render("success")
        res.redirect("/error");
      });
      console.log(pay)
  });
});

app.get("/receipt/:id", (req, res) => {
  const id = req.params.id;
  Pay.findById(id).then(pay => {
      if (!pay) {
        //handle error when the donor is not found
        res.redirect("/error");
      }


      let payAmount = pay.amount / 100;
      res.render("/success", { pay, payAmount });
      
    }).catch((e) => {
      res.redirect("/error");
      console.log(e)
    });
});

app.get((req, res) => {
  res.render("error404.hbs");
});

app.listen(port, (req, res) => {
  console.log("Server is currently listening at at port:", port);
});
