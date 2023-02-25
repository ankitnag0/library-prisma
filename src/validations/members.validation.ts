import Joi from 'joi';

const getMember = {
    params: Joi.object().keys({
        id: Joi.string().uuid({ version: 'uuidv4' })
    })
}

const getMembers = {
    query: Joi.object().keys({
        name: Joi.string(),
        email: Joi.string().email(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

const createMember = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        address: Joi.string(),
        phoneNumber: Joi.string(),
    })
}

const updateMember = {
    params: Joi.object().keys({
        id: Joi.string().uuid({ version: 'uuidv4' })
    }),
    body: Joi.object().keys({
        name: Joi.string(),
        email: Joi.string().email(),
        address: Joi.string(),
        phoneNumber: Joi.string(),
    })
        .min(1)
}

const deleteMember = {
    params: Joi.object().keys({
        id: Joi.string().uuid({ version: 'uuidv4' })
    })
}


export {
    getMember,
    getMembers,
    createMember,
    updateMember,
    deleteMember
}
