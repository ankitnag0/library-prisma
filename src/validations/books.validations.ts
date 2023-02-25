import Joi from 'joi';

const getBook = {
    params: Joi.object().keys({
        id: Joi.string().uuid({ version: 'uuidv4' })
    })
}

const getBooks = {
    query: Joi.object().keys({
        title: Joi.string(),
        author: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

const createBook = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        author: Joi.string().required(),
        description: Joi.string(),
        copies: Joi.number()
    })
}

const updateBook = {
    params: Joi.object().keys({
        id: Joi.string().uuid({ version: 'uuidv4' })
    }),
    body: Joi.object().keys({
        title: Joi.string(),
        author: Joi.string(),
        description: Joi.string(),
        copies: Joi.number()
    })
        .min(1)
}

const deleteBook = {
    params: Joi.object().keys({
        id: Joi.string().uuid({ version: 'uuidv4' })
    })
}


export {
    getBook,
    getBooks,
    createBook,
    updateBook,
    deleteBook
}