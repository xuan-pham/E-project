import Joi from "joi";

// validation form register
export const registerValidators = Joi.object({
    "name": Joi.string()
        .min(3)
        .max(30),

    "email": Joi.string()
        .email(),

    "password": Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

// validation form login
export const loginValidators = Joi.object({
    "email": Joi.string()
        .email(),

    "password": Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
})

