function removeExtraDetails(model) {
  const m = model.toJSON();
  m.id = m._id.toJSON();
  delete m._id;
  delete m.__v;
  return m;
}

module.exports = {
  removeExtraDetails,
};
