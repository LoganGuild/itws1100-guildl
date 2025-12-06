
function validate(formObj) {

  if (formObj.name.value.trim() === "") {
    alert("Please enter your name");
    formObj.name.focus();
    return false;
  }

  if (formObj.email.value.trim() === "") {
    alert("Please enter your email address");
    formObj.email.focus();
    return false;
  }

  var emailVal = formObj.email.value.trim();
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailVal)) {
    alert("Please enter a valid email address");
    formObj.email.focus();
    return false;
  }

  if (formObj.comment.value.trim() === "") {
    alert("Please enter a comment");
    formObj.comment.focus();
    return false;
  }

  return true;
}

$(document).ready(function() {

  $("#name").focus();

});

