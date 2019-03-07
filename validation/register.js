// user registration validation
const validator = require("validator");
const isEmpty = require("is-empty");

const validateRehisterInput = data => {
  let errors = {};

  // check user data
  if (isEmpty(data.name)) data.name = "";
  if (isEmpty(data.email)) data.email = "";
  if (isEmpty(data.password)) data.password = "";
  if (isEmpty(data.password2)) data.password2 = "";

  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters.";
  }

  if (isEmpty(data.name)) {
    errors.name = "Name cannot be empty.";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Email address non valid";
  }

  if (isEmpty(data.email)) {
    errors.email = "Email cannot be empty";
  }

  if (!validator.isLength(data.password, { min: 6, max: 15 })) {
    errors.password = "Password must be between 6 and 15 characters.";
  }

  if (isEmpty(data.password)) {
    errors.password = "Password cannot be empty.";
  }

  if (!validator.isLength(data.password2, { min: 6, max: 15 })) {
    errors.password2 = "Password2 must be between 6 and 15 characters.";
  }

  if (isEmpty(data.password2)) {
    errors.password2 = "Password2 cannot be empty.";
  }

  if (!validator.equals(data.password, data.password2)) {
    errors.password = "Passwords do not match.";
  }

  return { errors, isValid: isEmpty(errors) };
};

module.exports = validateRehisterInput;
