const cleanData = (dataObj) => {
  delete dataObj["__v"];

  return dataObj;
};

module.exports = {
  cleanData,
};
