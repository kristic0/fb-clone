const Joi = require('joi');

const registerValidation = (body) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(body);
};

const loginValidation = (body) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(body);
};

const removeUserValidation = (body) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    removeUserEmail: Joi.string().min(3).required(),
  });
  return schema.validate(body);
};

const addFriendValidation = (body) => {
  const schema = Joi.object({
    id: Joi.string().required(),
    friendId: Joi.string().required()
  });
  return schema.validate(body);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.removeUserValidation = removeUserValidation;
module.exports.addFriendValidation = addFriendValidation;
