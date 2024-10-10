import { Router } from 'express';
import { handleUpdateUser } from '../controllers/userController';
import { authorizeUser } from '../middleware/authMiddleware';
import { validateGameId } from '../middleware/gameMiddleware';

const router = Router();

// router.get('', authorizeUser, handleFetchGamesByUser);
// router.post('', authorizeUser, handleCreateGame);
router.patch('', authorizeUser, handleUpdateUser);
// router.delete('', authorizeUser, validateGameId, handleDeleteGame);

export default router;