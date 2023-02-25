import express from 'express';
import * as checkoutController from '../controllers/checkout.controller';
import authentication from '../middlewares/auth';
import validate from '../middlewares/validate';
import * as checkoutValidation from '../validations/checkout.validations';

const router = express.Router();

router.post('/', authentication, validate(checkoutValidation.checkout), checkoutController.checkoutBook);
router.post('/return', authentication, validate(checkoutValidation.returnBook), checkoutController.returnBook);

export default router;
