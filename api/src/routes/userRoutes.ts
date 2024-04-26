import { Router } from 'express';
import { createUser, editUser, getOneUser, loginUser, returnUser, returnUserId } from '../controllers/userController';

const router = Router();

router.get('/:id', getOneUser);
router.put('/:id', editUser)
router.post('/', createUser);
router.post('/login', loginUser);
router.post('/finduser', returnUser);
router.post('/findid', returnUserId);

export default router;