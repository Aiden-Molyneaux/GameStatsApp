import { Router } from 'express';
import { handleRegistration, handleLogin, handleValidation } from '../controllers/authController';

const router = Router();

router.post('/register', handleRegistration);
router.post('/login', handleLogin);
router.get('/validate', handleValidation);
export default router;