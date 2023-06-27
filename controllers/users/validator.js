
const Joi = require("joi");

const schema = Joi.object({
  symbol: Joi.string().alphanum().min(3).max(5).required().uppercase(),
});

module.exports = schema;