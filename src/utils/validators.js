// exports.userValidators = {
//   validateUsername: (username = "") => {
//     if (username.trim() === "") return "Username is required.";

//     if (username.length < 8)
//       return "Username must be at lease 8 characters long.";

//     return true;
//   },
//   validatePassword: (password = "") => {
//     if (password.trim() === "") return "Password is required.";

//     if (password.length < 8)
//       return "Password must be at least 8 characters long.";

//     return true;
//   },
//   validateFirstName: (firstName = "") => {
//     if (firstName.trim() === "") return "First name is required.";

//     return true;
//   },
//   validateLastName: (lastName = "") => {
//     if (lastName.trim() === "") return "Last name is required.";

//     return true;
//   },
//   validateRole: (role = "") => {
//     const userRole = +role;

//     if (userRole < 1 || userRole > 3) return "Invalid role";

//     return true;
//   },
// };

const MIN_TITlE = 5;
const MIN_DESC = 20;
const MIN_TAG = 5;

exports.quizValidator = {
  validateTitle: (title = "") => {
    if (title.trim() === "") return "Title is required";

    if (title.length < MIN_TITlE)
      return `Title must be at least ${MIN_TITlE} or more characters`;

    return true;
  },
  validateDescription: (description = "") => {
    if (description.trim() === "") return "Description is required";

    if (description.length < MIN_DESC)
      return `Description must be at least ${MIN_DESC} or more characters`;

    return true;
  },
  validateTag: (tag = "") => {
    if (tag.trim() === "") return "Tag is required";

    if (tag.length < MIN_TAG)
      return `Tag must be at least ${MIN_TAG} or more characters`;

    return true;
  },
};
