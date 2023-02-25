import { Router } from 'express';
import booksRouter from './books.routes';
import adminRouter from './admin.routes';
import membersRouter from './members.routes';
import checkoutRouter from './checkout.routes';

const router = Router();

router.use('/books', booksRouter);
router.use('/checkout', checkoutRouter);
router.use('/members', membersRouter);
router.use('/admin', adminRouter);

export default router;
