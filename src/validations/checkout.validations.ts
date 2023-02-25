import Joi from 'joi';

const checkout = {
    body: Joi.object().keys({
        bookId: Joi.string().uuid({ version: 'uuidv4' }).required(),
        memberId: Joi.string().uuid({ version: 'uuidv4' }).required()
    })
}

const returnBook = {
    body: Joi.object().keys({
        bookId: Joi.string().uuid({ version: 'uuidv4' }).required(),
        memberId: Joi.string().uuid({ version: 'uuidv4' }).required()
    })
}

export {
    checkout,
    returnBook
}