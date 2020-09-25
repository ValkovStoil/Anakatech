{
  const logInButton = document.getElementById("login-btn");
  const inputField = document.getElementById("login-field");

  logInButton.addEventListener("click", login);

  function login() {
    if (inputField.value === "") {
      alert("Please enter Email address");
    } else if (!inputField.value.includes("@")) {
      alert("Invalid email address!");
      inputField.value = "";
    } else {
      alert(`Thank you ${inputField.value}, have a nice browse`);
      inputField.value = "";
    }
  }
}
