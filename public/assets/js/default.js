var myVar;

function myFunction() {
  myVar = setTimeout(showPage, 1000);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("fullBody").style.display = "block";
}
/* Change from login to forgotPassword*/ 
function changeMe(){
  document.getElementById("login").style.display = "none";
  document.getElementById("ForgetPassword").style.display = "block";
}
/* End */

/* Change from forgotPassword to login*/ 
function unChangeMe(){
  document.getElementById("ForgetPassword").style.display = "none";
  document.getElementById("login").style.display = "block";
}
/* End */
/* Required Field*/
function checkform( form )
{
  




  if (form.firstName.value == "") {
    alert( "Please enter first Name." );
    form.firstName.focus();
    return false ;
  }
  if (form.lastName.value == "") {
    alert( "Please enter last Name." );
    form.lastName.focus();
    return false ;
  }
  if (form.otherNames.value == "") {
    alert( "Please enter other Names." );
    form.otherNames.focus();
    return false ;
  }
  if (form.phoneNumber.value == "") {
    alert( "Please enter phone Number." );
    form.phoneNumber.focus();
    return false ;
  }
  if (form.email.value == "") {
    alert( "Please enter email." );
    form.email.focus();
    return false ;
  }
  if (form.religion.value == "") {
    alert( "Please enter religion." );
    form.religion.focus();
    return false ;
  }
  if (form.genotype.value == "") {
    alert( "Please enter genotype." );
    form.genotype.focus();
    return false ;
  }
  if (form.bloodGroup.value == "") {
    alert( "Please enter blood Group." );
    form.bloodGroup.focus();
    return false ;
  }
  if (form.HomeAdress.value == "") {
    alert( "Please enter Home Adress." );
    form.HomeAdress.focus();
    return false ;
  }
  if (form.country.value == "") {
    alert( "Please enter country." );
    form.country.focus();
    return false ;
  }
  if (form.stateOfOrigin.value == "") {
    alert( "Please enter state Of Origin." );
    form.stateOfOrigin.focus();
    return false ;
  }
  if (form.localGovernmentArea.value == "") {
    alert( "Please enter local Government." );
    form.localGovernmentArea.focus();
    return false ;
  }
  if (form.dateOfBirth.value == "") {
    alert( "Please enter date Of Birth." );
    form.dateOfBirth.focus();
    return false ;
  }
  if (form.gender.value == "") {
    alert( "Please enter gender." );
    form.gender.focus();
    return false ;
  }
  if (form.maritalStatus.value == "") {
    alert( "Please enter maritalStatus." );
    form.maritalStatus.focus();
    return false ;
  }
  if (form.jambNumber.value == "") {
    alert( "Please enter jambNumber." );
    form.jambNumber.focus();
    return false ;
  }
  if (form.faculty.value == "") {
    alert( "Please enter faculty." );
    form.faculty.focus();
    return false ;
  }
  if (form.department.value == "") {
    alert( "Please enter department." );
    form.department.focus();
    return false ;
  }
  if (form.nextOfKinFirstName.value == "") {
    alert( "Please enter nextOfKin First Name." );
    form.nextOfKinFirstName.focus();
    return false ;
  }
  if (form.nextOfKinSurname.value == "") {
    alert( "Please enter nextOfKin Surname." );
    form.nextOfKinSurname.focus();
    return false ;
  }
  if (form.nextOfKinRelationship.value == "") {
    alert( "Please enter nextOfKin Relationship." );
    form.nextOfKinRelationship.focus();
    return false ;
  }
  if (form.nextOfKinAddress.value == "") {
    alert( "Please enter nextOfKin Address." );
    form.nextOfKinAddress.focus();
    return false ;
  }
  if (form.nextOfKinPhoneNumber.value == "") {
    alert( "Please enter nextOfKin Phone Number ." );
    form.nextOfKinPhoneNumber.focus();
    return false ;
  }
  if (form.sponsorFirstName.value == "") {
    alert( "Please enter sponsor First Name ." );
    form.sponsorFirstName.focus();
    return false ;
  }
  if (form.sponsorSurname.value == "") {
    alert( "Please enter sponsor Surname ." );
    form.sponsorSurname.focus();
    return false ;
  }
  if (form.sponsorHomeAddress.value == "") {
    alert( "Please enter sponsor Home Address." );
    form.sponsorHomeAddress.focus();
    return false ;
  }
  if (form.sponsorPhoneNumber.value == "") {
    alert( "Please enter sponsor Phone Number." );
    form.sponsorPhoneNumber.focus();
    return false ;
  }
  if (form.sponsorEmail.value == "") {
    alert( "Please enter sponsor Email." );
    form.sponsorEmail.focus();
    return false ;
  }
  if (form.sponsorRelationship.value == "") {
    alert( "Please enter sponsor Relationship." );
    form.sponsorRelationship.focus();
    return false ;
  }
  
  return true ;
}

/* End Form Field */

$(document).ready(function () {

  var navListItems = $('div.setup-panel div a'),
    allWells = $('.setup-content'),
    allNextBtn = $('.nextBtn');

  allWells.hide();

  navListItems.click(function (e) {
    e.preventDefault();
    var $target = $($(this).attr('href')),
      $item = $(this);

    if (!$item.hasClass('disabled')) {
      navListItems.removeClass('btn-primary').addClass('btn-default');
      $item.addClass('btn-primary');
      allWells.hide();
      $target.show();
      $target.find('input:eq(0)').focus();
    }
  });

  allNextBtn.click(function () {
    var curStep = $(this).closest(".setup-content"),
      curStepBtn = curStep.attr("id"),
      nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
      curInputs = curStep.find("input[type='text'],input[type='url'],input[type='Tel'],input[type='email']"),
      isValid = true;

    $(".form-group").removeClass("has-error");
    for (var i = 0; i < curInputs.length; i++) {
      if (!curInputs[i].validity.valid) {
        isValid = false;
        $(curInputs[i]).closest(".form-group").addClass("has-error");
      }
    }

    if (isValid)
      nextStepWizard.removeAttr('disabled').trigger('click');
  });

  $('div.setup-panel div a.btn-primary').trigger('click');
});
