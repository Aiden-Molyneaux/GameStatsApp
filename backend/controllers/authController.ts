import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, findUserByUsername } from '../models/userModel';

interface AuthRequest extends Request {
  user?: { id: number };
}

export async function register(req: Request, res: Response): Promise<void> {
  const { username, password } = req.body;

  if (typeof password !== 'string') {
    res.status(400).json({ error: 'Password must be a string' });
    return;
  }

  try {
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(username, hashedPassword);

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (err) {
    console.error('Error in register controller:', err);
    res.status(500).json({ error: (err as Error).message });
  }
};

export async function login(req: Request, res: Response): Promise<void> {
  const { username, password } = req.body;

  try {
    const user = await findUserByUsername(username);
    if (!user) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (err) {
    console.error('Error in login controller:', err);
    res.status(500).json({ error: (err as Error).message });
  }
};