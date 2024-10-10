import { Router } from 'express';
import { handleFetchGamesByUser, handleCreateGame, handleUpdateGame, handleDeleteGame } from '../controllers/gameController';
import { authorizeUser } from '../middleware/authMiddleware';
import { validateGameId } from '../middleware/gameMiddleware';

const router = Router();

router.get('', authorizeUser, handleFetchGamesByUser);
router.post('', authorizeUser, handleCreateGame);
router.patch('', authorizeUser, handleUpdateGame);
router.delete('', authorizeUser, validateGameId, handleDeleteGame);

export default router;