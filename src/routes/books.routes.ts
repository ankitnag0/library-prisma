import express from 'express'
import * as booksController from '../controllers/books.controller';
import authentication from '../middlewares/auth';
import validate from '../middlewares/validate';
import * as booksValidation from '../validations/books.validations';


const router = express.Router()

router.get('/', booksController.getAllBooks)
router.get('/:id', validate(booksValidation.getBook), booksController.getBookById)
router.post('/', authentication, validate(booksValidation.createBook), booksController.createBook)
router.put('/:id', authentication, validate(booksValidation.updateBook), booksController.updateBookById)
router.delete('/:id', authentication, validate(booksValidation.deleteBook), booksController.deleteBookById)

export default router
