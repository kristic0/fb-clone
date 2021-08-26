import Joi from "joi";

export const registracijaValidacija = (body) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(body);
};

export const loginValidacija = (body) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(body);
};

export const obrisiKorisnikaValidacija = (body) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    removeUserEmail: Joi.string().min(3).required(),
  });
  return schema.validate(body);
};

export const dodajPrijateljaValidacija = (body) => {
  const schema = Joi.object({
    id: Joi.string().required(),
    friendId: Joi.string().required(),
  });
  return schema.validate(body);
};

export const getZahteveZaPrijateljaValidacija = (body) => {
  const schema = Joi.object({
    id: Joi.string().required(),
  });
  return schema.validate(body);
};

export const uploadSlikeValidacija = (body) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
    img: Joi.any(),
  });
  return schema.validate(body);
};

export const daLiJePoslatIdKorisnika = (body) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
  });
  return schema.validate(body);
};

export const dodajPostValidacija = (body) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
    content: Joi.string().max(500).required(),
    imgUrl: Joi.string().max(500),
  });
  return schema.validate(body);
};

export const reagujNaPostValidacija = (body) => {
  const schema = Joi.object({
    postId: Joi.string().required(),
    userId: Joi.string().required(),
    reaction: Joi.number().required(),
  });
  return schema.validate(body);
};
