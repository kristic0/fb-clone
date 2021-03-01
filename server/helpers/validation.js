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
    friendId: Joi.string().required(),
  });
  return schema.validate(body);
};

const getFriendRequests = (body) => {
  const schema = Joi.object({
    id: Joi.string().required(),
  });
  return schema.validate(body);
};

const uploadImageValidation = (body) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
    img: Joi.any(),
  });
  return schema.validate(body);
};

const getImageValidation = (body) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
  });
  return schema.validate(body);
};

const addPostValidation = (body) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
    content: Joi.string().max(500),
  });
  return schema.validate(body);
};

const reactToPostValidation = (body) => {
  const schema = Joi.object({
    postId: Joi.string().required(),
    userId: Joi.string().required(),
    reaction: Joi.number().required(),
  });
  return schema.validate(body);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.removeUserValidation = removeUserValidation;
module.exports.addFriendValidation = addFriendValidation;
module.exports.getFriendRequests = getFriendRequests;
module.exports.uploadImageValidation = uploadImageValidation;
module.exports.getImageValidation = getImageValidation;
module.exports.addPostValidation = addPostValidation;
module.exports.reactToPostValidation = reactToPostValidation;
