import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { postUser, findUserByUsername } from '../models/userModel';

// interface AuthRequest extends Request {
//   user?: { id: number };
// }

export async function handleRegistration(req: Request, res: Response) {
  console.log('Handling request to register new user...');
  const { username, password } = req.body;

  // Validate password type
  if (typeof password !== 'string') {
    return res.status(400).json({ error: 'Password must be a string.' });
  }

  try {
    // Check if user already exists
    const response = await findUserByUsername(username);
    if (response.success) {
      return res.status(400).json({ error: 'User already exists.' });
    } 

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const postResponse = await postUser(username, hashedPassword);

    if (!postResponse.success) {
      return res.status(400).json({ error: 'User creation failed.' });
    }

    const user = postResponse.user;
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    return res.status(201).json({ token });
  } catch (err) {
    return res.status(500).json({ error: `Backend server error while registering new user: ${err}` });
  }
};

export async function handleLogin(req: Request, res: Response): Promise<void> {
  console.log('Handling request to login user...');
  const { username, password } = req.body;

  try {
    const response = await findUserByUsername(username);

    if (!('existingUser' in response)) {
      res.status(401).json({ error: '-> User Authorization ERROR:' });
      return;
    }

    const user = response.existingUser;

    if (!response.success) {
      res.status(400).json({ error: 'Invalid credentials.' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.passwordDigest);
    if (!isMatch) {
      res.status(400).json({ error: 'Invalid credentials.' });
      return;
    }
  
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: `Backend server error while logging in user: ${err}` });
  }
};

export async function handleValidation(req: Request, res: Response): Promise<void> {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    res.status(401).json({ error: 'No token provided' });
    return;
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET as string);
    res.status(200).json({ message: 'Token is valid' });
  } catch (err) {
    res.status(403).json({ error: 'Invalid token' });
  }
}