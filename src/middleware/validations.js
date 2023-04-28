const validateName = (req, res, next) => {
  const { body } = req;
  if (!('name' in body)) return res.status(400).json({ message: '"name" is required' });

  if (body.name.length < 6) {
 return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
}
  return next();
};

module.exports = {
  validateName,
};