import Joi from 'joi';

const registerAdmin = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string(),
    })
}

const loginAdmin = {
    body: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string(),
    })
}


export {
    registerAdmin,
    loginAdmin
}