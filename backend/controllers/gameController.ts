import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { postGame, getGamesByUser } from '../models/gameModel';

export async function fetchGamesByUser(req: Request, res: Response): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized access' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    const userId = 1;
    // const userId = decoded.id;

    const games = await getGamesByUser(userId);
    res.status(200).json({ games });
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export async function createGame(req: Request, res: Response): Promise<void> {
  const { name, hours, datePurchased } = req.body;
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized access' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    console.log(decoded);
    // const userId = decoded.id;

    const userId = 1;

    const game = await postGame({userId, name, hours, datePurchased});

    res.status(200).json({ game });
    //   game: {
    //     id: game.id,
    //     userId: game.userId,
    //     name: game.name,
    //     hours: game.hours,
    //     datePurchased: game.datePurchased
    //   } 
    // });
  } catch (err) {
    console.error('Error in game controller:', err);
    res.status(500).json({ error: (err as Error).message });
  }
};