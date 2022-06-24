import Joi from "joi";

export const UserValidators = Joi.object({
  "name": Joi.string()
      .min(3)
      .max(30),

  "email": Joi.string()
      .email(),

  "password": Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});
