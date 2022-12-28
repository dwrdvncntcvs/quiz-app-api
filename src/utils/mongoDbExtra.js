const handleValidationError = (errorMessage = "", statusCode) => {
  const errorObject = {};
  const [fields] = errorMessage.split("validation failed:").reverse();

  for (let field of fields.split(",")) {
    const [key, value] = field.split(":");

    errorObject[key.trim()] = value.trim();
  }

  return { statusCode, errorMessages: errorObject };
};

module.exports = { handleValidationError };
