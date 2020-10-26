module.exports = function transtormIdFormat() {
  const obj = this.toObject();

  obj.id = obj._id;
  delete obj._id;
  delete obj.password;

  return obj;
};
