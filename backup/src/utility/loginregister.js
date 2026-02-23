class IsLoginCorrect {
  constructor() {
    this.username = document.getElementById("username").value;
    this.email = document.getElementById("email").value;
    this.password = document.getElementById("password").value;
  }
  static checkNullValues() {
    if (this.username === "" && this.password === "") {
      return true;
    } else {
      return false;
    }
  }
  static isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
}
