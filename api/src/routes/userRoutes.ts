import { Router } from 'express';
import { createUser, loginUser, returnUser } from '../controllers/userController';

const router = Router();

router.post('/', createUser);
router.post('/login', loginUser);
router.post('/finduser', returnUser);

export default router;