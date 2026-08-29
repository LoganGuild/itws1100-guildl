document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("addForm");
  const output = document.getElementById("output");
  const comments = document.getElementById("comments");

  form.elements.firstName.focus();

  function showMessage(message, type) {
    output.textContent = message;
    output.className = type;
    output.hidden = false;
  }

  function validateForm(event) {
    event.preventDefault();

    const requiredFields = [
      ["firstName", "first name"],
      ["lastName", "last name"],
      ["title", "title"],
      ["org", "organization"],
      ["pseudonym", "nickname"],
      ["comments", "comment"],
    ];

    for (const [fieldName, label] of requiredFields) {
      const field = form.elements[fieldName];
      if (!field.value.trim()) {
        showMessage(`Please enter a ${label} before validating the form.`, "error");
        field.focus();
        return;
      }
    }

    showMessage(
      "Validation complete. This static demonstration does not transmit or store your entry.",
      "success",
    );
  }

  function showNickname() {
    const firstName = form.elements.firstName.value.trim();
    const lastName = form.elements.lastName.value.trim();
    const nickname = form.elements.pseudonym.value.trim();

    if (!firstName || !lastName || !nickname) {
      showMessage("Add a first name, last name, and nickname to try this interaction.", "error");
      (!firstName ? form.elements.firstName : !lastName ? form.elements.lastName : form.elements.pseudonym).focus();
      return;
    }

    showMessage(`${firstName} ${lastName} goes by “${nickname}.”`, "success");
  }

  form.addEventListener("submit", validateForm);
  document.getElementById("findNicknameButton").addEventListener("click", showNickname);
  document.getElementById("clearCommentsButton").addEventListener("click", () => {
    comments.value = "";
    comments.focus();
    showMessage("The comments field has been cleared.", "success");
  });
});
