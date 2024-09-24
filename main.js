const form = document.getElementById("form");
const nameInput = document.getElementById("fullName");
const nameMassage = document.getElementById("nameMassage");
const userNameInput = document.getElementById("username");
const userNameMassage = document.getElementById("userNameMassage");
const emailInput = document.getElementById("email");
const emailMassage = document.getElementById("emailMassage");
const numberInput = document.getElementById("phone");
const numberMassage = document.getElementById("phoneMassage");
const generatedpasswordInput = document.getElementById("generatedpassword");
const generatedpasswordBtn = document.getElementById("generate");
const copyBtn = document.querySelector(".copy");
const myPasswordInput = document.getElementById("realNumbers");
const confirmedPasswordInput = document.getElementById("confirmPassword");
const body = document.getElementById("section");
const passwordMassage = document.getElementById("passwordMassage");
const successMessage = document.createElement("p");

// Handling name
function nameWorks() {
  let name = nameInput.value.trim();
  const nameStructure = /^[A-Za-z\s]+$/;

  if (name === "") {
    nameMassage.textContent = "Name cannot be empty";
    return false; // Invalid
  } else if (!nameStructure.test(name)) {
    nameMassage.textContent = "Invalid name. Use only letters and spaces.";
    return false; // Invalid
  }

  nameMassage.textContent = ""; // Clear message
  return true; // Valid
}

function userNameWorks() {
  let userName = userNameInput.value.trim();
  const userNameStructure = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9_\W]+$/;

  if (userName === "") {
    userNameMassage.textContent = "User name cannot be empty";
    return false; // Invalid
  } else if (!userNameStructure.test(userName)) {
    userNameMassage.textContent =
      "Invalid user name. Must use letters, numbers, and underscores.";
    return false; // Invalid
  }

  userNameMassage.textContent = ""; // Clear message
  return true; // Valid
}

function emailWorks() {
  let email = emailInput.value.trim();
  const emailStructure = /[\w.%+-]{2,20}@[A-Za-z0-9.-]{2,20}\.[A-Za-z]{2,5}/gi;

  if (email === "") {
    emailMassage.textContent = "Email cannot be empty";
    return false; // Invalid
  } else if (!emailStructure.test(email)) {
    emailMassage.textContent = "Invalid email. Must contain @ and domain.";
    return false; // Invalid
  }

  emailMassage.textContent = ""; // Clear message
  return true; // Valid
}

function numberWorks() {
  let number = numberInput.value.trim();
  const numberStructure = /\+?(88)?0\d{3}~?\d{3}~?\d{4}/gi;

  if (number === "") {
    numberMassage.textContent = "Number cannot be empty";
    return false; // Invalid
  } else if (!numberStructure.test(number)) {
    numberMassage.textContent = "Invalid number. Must use BD number.";
    return false; // Invalid
  }

  numberMassage.textContent = ""; // Clear message
  return true; // Valid
}

// Password Generation
function generatePassword() {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~!@#$%^&*()_+{}[]:\";'<>?,./";
  let password = "";
  const length = Math.floor(Math.random() * 11) + 10; // Random length between 10 and 20

  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  generatedpasswordInput.value = password; // Place generated password in the input
  myPasswordInput.value = password; // Also set it in the realNumbers input
}

// Copy Password
function copyPassword() {
  generatedpasswordInput.select();
  document.execCommand("copy");
  alert("Password copied to clipboard!"); // Optional alert
}

// Submit Works
function submitWorks(e) {
  e.preventDefault(); // Prevent the form from refreshing the page

  // Validate all fields
  const isNameValid = nameWorks();
  const isUserNameValid = userNameWorks();
  const isEmailValid = emailWorks();
  const isNumberValid = numberWorks();

  let myPassword = myPasswordInput.value;
  let confirmedPassword = confirmedPasswordInput.value;

  // Check password match
  if (myPassword !== confirmedPassword) {
    passwordMassage.textContent = "Passwords do not match";
    return; // Stop the function if passwords do not match
  } else {
    passwordMassage.textContent = ""; // Clear message if they match
  }

  // Only create account if all fields are valid
  if (isNameValid && isUserNameValid && isEmailValid && isNumberValid) {
    // Show success message
    successMessage.textContent = "Your account is successfully created!";
    successMessage.classList.add("green");
    successMessage.style.color = "green";
    body.appendChild(successMessage);

    // Hide the form for 2 seconds
    form.style.display = "none";
    setTimeout(() => {
      form.style.display = "block"; // Show the form again
      successMessage.remove(); // Remove the success message
      // Optionally, you can clear the form inputs here
      form.reset();
    }, 2000);
  }
}

// Event Listeners
generatedpasswordBtn.addEventListener("click", generatePassword);
copyBtn.addEventListener("click", copyPassword);
form.addEventListener("submit", submitWorks);
