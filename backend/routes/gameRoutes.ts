import { Router } from 'express';
import { handleFetchGamesByUser, handleCreateGame, handleDeleteGame } from '../controllers/gameController';
import { authorizeUser } from '../middleware/authMiddleware';
import { validateGameId } from '../middleware/gameMiddleware';

const router = Router();

router.get('', authorizeUser, handleFetchGamesByUser);
router.post('', authorizeUser, handleCreateGame);
router.delete('', authorizeUser, validateGameId, handleDeleteGame);

export default router;