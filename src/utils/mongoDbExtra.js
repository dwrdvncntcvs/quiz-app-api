const handleValidationError = (errorMessage = "", statusCode) => {
  const errorObject = {};
  const [fields] = errorMessage.split(/validation failed:/i).reverse();

  for (let field of fields.split(",")) {
    const [key, value] = field.split(":");

    errorObject[key.trim()] = value.trim();
  }

  return { statusCode, errorMessages: errorObject };
};

const createQueries = (queryObj) => {
  let newQuery = {};

  for (let key in queryObj) {
    const reg = new RegExp(`${queryObj[key]}`, "i");
    newQuery[key] = reg;
  }

  return { ...newQuery, totalItems: { $gt: 4 } };
};

const extractQuizIdSet = (queryArr) => {
  if (queryArr.length === 0) return queryArr;

  const data = queryArr.map(({ quizId }) => quizId);

  const dataSet = new Set(data);
  return dataSet;
};

module.exports = { handleValidationError, createQueries, extractQuizIdSet };
