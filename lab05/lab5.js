/* Lab 5 JavaScript File 
   Place variables and functions in this file */
window.onload = firstElementFocus;
function firstElementFocus() {
   const form = document.getElementById("addForm");
   form.elements[0].focus();
}

function validate(formObj) {
   // put your validation code here
   // it will be a series of if statements

   if (formObj.firstName.value == "") {
      alert("You must enter a first name");
      formObj.firstName.focus();
      return false;
   }
   if (formObj.lastName.value == "") {
      alert("You must enter a last name");
      formObj.lastName.focus();
      return false;
   }
   if (formObj.title.value == "") {
      alert("You must enter a title");
      formObj.title.focus();
      return false;
   }
   if (formObj.org.value == "") {
      alert("You must enter a organization");
      formObj.org.focus();
      return false;
   }
   if (formObj.pseudonym.value == "") {
      alert("You must enter a nickname");
      formObj.pseudonym.focus();
      return false;
   }
   if (formObj.comments.value == "") {
      alert("You must enter some comments");
      formObj.comments.focus();
      return false;
   }
   alert("Form has been submitted successfully!");
   return true;
}
function clearComments() {
   const form = document.getElementById('addForm');
   if (form.comments.value.trim() === "Please enter your comments") {
      form.comments.value = "";
      alert("'Please enter your comments' has been removed!");
   }
}
clearCommentsButton.onclick = clearComments;
function restoreComments() {
  const form = document.getElementById("addForm");
  if (form.comments.value.trim() === "") {
    form.comments.value = "Please enter your comments";
  }
}

function findNickname() {
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const nickname = document.getElementById("pseudonym");
if (firstName.value !== "" && lastName.value !== "") {
   alert(firstName.value + " " + lastName.value + " is " + nickname.value);
}
}
findNicknameButton.onclick = findNickname;
