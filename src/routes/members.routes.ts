import express from 'express'
import * as membersController from '../controllers/members.controller';
import authentication from '../middlewares/auth';
import validate from '../middlewares/validate';
import * as membersValidation from '../validations/members.validation';

const router = express.Router()

router.get('/', authentication, membersController.getAllMembers)
router.get('/:id', authentication, validate(membersValidation.getMember), membersController.getMemberById)
router.post('/', authentication, validate(membersValidation.createMember), membersController.createMember)
router.put('/:id', authentication, validate(membersValidation.updateMember), membersController.updateMemberById)
router.delete('/:id', authentication, validate(membersValidation.deleteMember), membersController.deleteMemberById)

export default router
