exports.userValidators = {
  validateUsername: (username = "") => {
    if (username.trim() === "") return "Username is required.";

    if (username.length < 8)
      return "Username must be at lease 8 characters long.";

    return true;
  },
  validatePassword: (password = "") => {
    if (password.trim() === "") return "Password is required.";

    if (password.length < 8)
      return "Password must be at least 8 characters long.";

    return true;
  },
  validateFirstName: (firstName = "") => {
    if (firstName.trim() === "") return "First name is required.";

    return true;
  },
  validateLastName: (lastName = "") => {
    if (lastName.trim() === "") return "Last name is required.";

    return true;
  },
  validateRole: (role = "") => {
    const userRole = +role;

    if (userRole < 1 || userRole > 3) return "Invalid role";

    return true;
  },
};
