import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware'; 
import jwt from 'jsonwebtoken';
import { patchUser } from '../models/userModel';

export async function handleUpdateUser(req: AuthRequest, res: Response) {
  console.log('Handling request to update user...');
  const { id, username, favouriteGame } = req.body.updatedUser;

  if (!req.user || !req.user.id) {
    res.status(401).json({ error: 'User authorization error' });
    return;
  }

  try {
    const response = await patchUser({ id, username, favouriteGame });

    if (response.success) {
      return res.status(200).json({ user: response.user });
    } {
      return res.status(400).json({ error: `Could not update game.`});
    }
  } catch(err) {
    return res.status(500).json({ error: `Backend server error while updating game: ${err}` });
  }
};