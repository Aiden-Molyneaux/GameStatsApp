import { Router } from 'express';
import { handleRegistration, handleLogin } from '../controllers/authController';

const router = Router();

router.post('/register', handleRegistration);
router.post('/login', handleLogin);

export default router;