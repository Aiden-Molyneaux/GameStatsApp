import { Router } from 'express';
import { handleFetchGamerTagsByUser, handleCreateGamerTag, handleUpdateGamerTag, handleDeleteGamerTag } from '../controllers/gamerTagController';
import { authorizeUser } from '../middleware/authMiddleware';
import { validateGameId } from '../middleware/gameMiddleware';

const router = Router();

router.get('', authorizeUser, handleFetchGamerTagsByUser);
router.post('', authorizeUser, handleCreateGamerTag);
router.patch('', authorizeUser, handleUpdateGamerTag);
router.delete('', authorizeUser, validateGameId, handleDeleteGamerTag);

export default router;