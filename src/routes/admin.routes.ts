import express from 'express'
import * as adminController from '../controllers/admin.controller';
import validate from '../middlewares/validate';
import * as adminValidation from '../validations/admin.validations';

const router = express.Router()

router.post('/register', validate(adminValidation.registerAdmin), adminController.registerAdmin);
router.post('/login', validate(adminValidation.loginAdmin), adminController.loginAdmin);

export default router;
