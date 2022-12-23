function removeExtraDetails(model) {
  const m = model.toJSON();
  m.id = m._id.toJSON();
  delete m._id;
  delete m.__v;
  return m;
}

const calculatePercentage = (score, totalItems) => {
  return ((score / totalItems) * 100).toFixed(2);
};

module.exports = {
  removeExtraDetails,
  calculatePercentage,
};
