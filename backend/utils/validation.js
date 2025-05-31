const { validationResult } = require("express-validator");

const checkValidationError = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array()[0];
    if ("path" in firstError) {
      const message = firstError.path + " " + firstError.msg;
      const error = new Error(message);
      error.statusCode = 400;
      throw error;
    }
  }
};

module.exports = { checkValidationError };
