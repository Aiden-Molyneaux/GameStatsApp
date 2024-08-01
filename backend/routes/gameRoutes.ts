import { Router } from 'express';
import { fetchGamesByUser, createGame } from '../controllers/gameController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.get('/userId', fetchGamesByUser)
router.post('/', createGame);

export default router;