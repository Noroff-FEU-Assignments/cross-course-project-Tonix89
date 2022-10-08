const successMessage = document.getElementById("messageSent");
const contactFormCont = document.getElementById("contactForm");
const form = document.getElementById("contactForm");
const fullname = document.getElementById("fullname");
const fullnameError = document.getElementById("fullnameError");
const email = document.getElementById("email");
const emailError = document.getElementById("emailError");
const subject = document.getElementById("subject");
const subjectError = document.getElementById("subjectError");
const message = document.getElementById("message");
const messageError = document.getElementById("messageError");

function validateForm(event) {
  event.preventDefault();

  if (validateLength(fullname.value, 6) === true) {
    fullnameError.style.display = "none";
  } else {
    fullnameError.style.display = "block";
  }

  if (validateEmail(email.value) === true) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
  }

  if (validateLength(subject.value, 15) === true) {
    subjectError.style.display = "none";
  } else {
    subjectError.style.display = "block";
  }

  if (message.value.trim().length <= 200 && message.value.trim().length != 0) {
    messageError.style.display = "none";
  } else {
    messageError.style.display = "block";
  }

  if (
    message.value.trim().length <= 10 &&
    validateEmail(email.value) === true &&
    validateLength(subject.value, 15) === true &&
    validateLength(fullname.value, 6) === true
  ) {
    successMessage.innerHTML += "Message Sent, Thank You.";
    contactFormCont.style.display = "none";
  }
}

form.addEventListener("submit", validateForm);

function validateLength(value, len) {
  if (value.trim().length >= len) {
    return true;
  } else {
    return false;
  }
}

function validateEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(email);
  return patternMatches;
}
