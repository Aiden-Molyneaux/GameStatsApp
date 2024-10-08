import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware'; 
import jwt from 'jsonwebtoken';
import { postGame, deleteGame, getGamesByUser } from '../models/gameModel';

export async function handleFetchGamesByUser(req: AuthRequest, res: Response) {
  console.log('Handling request to fetch games by user...');

  if (!req.user || !req.user.id) {
    res.status(401).json({ error: 'User authorization error' });
    return;
  }
  const userId = req.user.id;

  try {
    const response = await getGamesByUser(userId);

    if (response.success) {
      const games = response.games;
      return res.status(200).json({ games });
    }
      
  } catch (err) {
    return res.status(500).json({ error: `Backend server error while fetching games by user: ${err}` });
  }
};

export async function handleCreateGame(req: AuthRequest, res: Response) {
  console.log('Handling request to create game...');
  const { name, hours, datePurchased } = req.body;

  if (!req.user || !req.user.id) {
    res.status(401).json({ error: 'User authorization error' });
    return;
  }
  const userId = req.user.id;

  try {
    const response = await postGame({userId, name, hours, datePurchased});

    if (response.success) {
      return res.status(200).json({ game: response.game });
    } {
      return res.status(400).json({ error: `Could not create game.`});
    }
  } catch(err) {
    return res.status(500).json({ error: `Backend server error while creating game: ${err}` });
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