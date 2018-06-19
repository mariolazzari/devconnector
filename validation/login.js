// user login validation
// user registration validation
const validator = require("validator");
const isEmpty = require("./is-empty");

const validateLoginInput = data => {
    let errors = {};

    // check login data
    if (isEmpty(data.email)) data.email = "";
    if (isEmpty(data.password)) data.password = "";

    if (!validator.isEmail(data.email)) {
        errors.email = "Email address non valid";
    }

    if (isEmpty(data.email)) {
        errors.email = "Email cannot be empty";
    }

    if (isEmpty(data.password)) {
        errors.password = "Password cannot be empty.";
    }

    if (!validator.isLength(data.password, { min: 6, max: 15 })) {
        errors.password = "Password must be between 6 and 15 characters.";
    }

    return { errors, isValid: isEmpty(errors) };
};

module.exports = validateLoginInput;
