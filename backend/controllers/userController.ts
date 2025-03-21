import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware'; 
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

    if ('error' in response) {
      res.status(400).json({ error: response.error });
      return;
    }

    res.status(200).json({ user: response.user });
    return;
  } catch(err) {
    res.status(500).json({ 
      error: {
        code: 'SERVER_ERROR',
        message: `Backend server error while updating game: ${err}`
      }
    });
    return;
  }
};