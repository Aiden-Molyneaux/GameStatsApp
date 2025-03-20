import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { postUser, findUserByUsername } from '../models/userModel';
import { serverError, databaseError, authFailedError, unexpectedError } from './errors';

export async function handleRegistration(req: Request, res: Response) {
  console.log('Handling request to register new user...');
  const { username, password } = req.body;

  try {
    // Check if user already exists
    const response = await findUserByUsername(username);
    if ('user' in response) {
      res.status(400).json({
        error: {
          code: 'USER_ALREADY_EXISTS',
          message: 'Username must be unique.'
        }
      });
      return;
    } 

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const postResponse = await postUser(username, hashedPassword);

    if ('error' in postResponse) {
      if (postResponse.error.code === 'DATABASE_ERROR') {
        res.status(500).json({ error: databaseError });
        return;
      }

      res.status(500).json({ error: serverError });
      return;
    }

    const user = postResponse.user;

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    return res.status(201).json({ token, user });
  } catch (err) {
    console.error('Unexpected error during registration:', err);

    res.status(500).json({ error: unexpectedError });
    return
  }
};

export async function handleLogin(req: Request, res: Response): Promise<void> {
  console.log('Handling request to login user...');
  const { username, password } = req.body;

  try {
    const response = await findUserByUsername(username);

    if ('error' in response) {
      if (response.error.code === 'USER_NOT_FOUND') {
        res.status(404).json({ error: authFailedError });
        return
      }
      
      if (response.error.code === 'DATABASE_ERROR') {
        res.status(500).json({ error: databaseError });
        return;
      }
      
      res.status(500).json({ error: serverError });
      return;
    }

    const user = response.user;

    const isMatch = await bcrypt.compare(password, user.passwordDigest);
    if (!isMatch) {
      res.status(404).json({ error: authFailedError });
      return;
    }
  
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    res.status(200).json({ token, user });
  } catch (err) {
    console.error('Unexpected error during login:', err);

    res.status(500).json({ error: unexpectedError });
    return;
  }
};

const unauthorizedError = {
  code: 'UNAUTHORIZED',
  message: 'Your session has expired. Please log in again.'
};

export async function handleValidation(req: Request, res: Response): Promise<void> {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: unauthorizedError });
    return;
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET as string);
    res.status(200).send();
  } catch (err) {
    res.status(401).json({ error: unauthorizedError });
    return;
  }
}