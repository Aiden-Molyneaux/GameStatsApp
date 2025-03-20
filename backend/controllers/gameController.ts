import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware'; 
import { postGame, patchGame, deleteGame, getGamesByUser, ModelError } from '../models/gameModel';
import { serverError, databaseError, unexpectedError } from './errors';

export async function handleFetchGamesByUser(req: AuthRequest, res: Response) {
  console.log('Handling request to fetch games by user...');

  if (!req.user || !req.user.id) {
    res.status(401).json({ 
      error: {
        code: 'AUTH_ERROR',
        message: 'User authorization error'
      }
    });
    return;
  }

  const userId = req.user.id;

  try {
    const response = await getGamesByUser(userId);

    if ('error' in response) {
      const error = response.error;

      if (error.code === 'DATABASE_ERROR') {
        res.status(500).json({ error: databaseError });
        return;
      }

      res.status(500).json({ error: serverError });
      return;
    }

    const games = response.games;
    return res.status(200).json({ games });
  } catch (err) {
    console.error('Unexpected error during fetching games by user:', err);
    
    return res.status(500).json({ error: unexpectedError });
  }
};

export async function handleCreateGame(req: AuthRequest, res: Response) {
  console.log('Handling request to create game...', req);
  const { name, hours, percentComplete, datePurchased, titleColour, headerColour } = req.body.newGame;

  if (!req.user || !req.user.id) {
    res.status(401).json({ error: 'User authorization error' });
    return;
  }
  const userId = req.user.id;

  try {
    const response = await postGame({ userId, name, hours, percentComplete, datePurchased, titleColour, headerColour });

    if (response.success) {
      return res.status(200).json({ game: response.game });
    } {
      return res.status(400).json({ error: `Could not create game.`});
    }
  } catch(err) {
    return res.status(500).json({ error: `Backend server error while creating game: ${err}` });
  }
};

export async function handleUpdateGame(req: AuthRequest, res: Response) {
  console.log('Handling request to update game...');
  const { id, name, hours, percentComplete, datePurchased, titleColour, headerColour } = req.body.updatedGame;

  if (!req.user || !req.user.id) {
    res.status(401).json({ error: 'User authorization error' });
    return;
  }

  try {
    const response = await patchGame({ id, name, hours, percentComplete, datePurchased, titleColour, headerColour});

    if (response.success) {
      return res.status(200).json({ game: response.game });
    } {
      return res.status(400).json({ error: `Could not update game.`});
    }
  } catch(err) {
    return res.status(500).json({ error: `Backend server error while updating game: ${err}` });
  }
};

export async function handleDeleteGame(req: Request, res: Response) {
  console.log('Handling request to delete game...');

  const gameId = Number(req.query.gameId);

  try {
    const response = await deleteGame(gameId);

    if (response.success) {
      return res.status(200).json({ deletedGameId: response.deletedGameId });
    } {
      return res.status(404).json({ error: `Game Entity with ID (${gameId}) not found.`});
    }
  } catch (err) {
    return res.status(500).json({ error: `Backend server error while deleting game: ${err}` });
  }
};