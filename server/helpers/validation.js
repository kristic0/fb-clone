import Joi from "joi";

export const registerValidation = (body) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(body);
};

export const loginValidation = (body) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(body);
};

export const removeUserValidation = (body) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    removeUserEmail: Joi.string().min(3).required(),
  });
  return schema.validate(body);
};

export const addFriendValidation = (body) => {
  const schema = Joi.object({
    id: Joi.string().required(),
    friendId: Joi.string().required(),
  });
  return schema.validate(body);
};

export const getFriendRequests = (body) => {
  const schema = Joi.object({
    id: Joi.string().required(),
  });
  return schema.validate(body);
};

export const uploadImageValidation = (body) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
    img: Joi.any(),
  });
  return schema.validate(body);
};

export const isUserIdSent = (body) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
  });
  return schema.validate(body);
};

export const addPostValidation = (body) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
    content: Joi.string().max(500).required(),
  });
  return schema.validate(body);
};

export const reactToPostValidation = (body) => {
  const schema = Joi.object({
    postId: Joi.string().required(),
    userId: Joi.string().required(),
    reaction: Joi.number().required(),
  });
  return schema.validate(body);
};
