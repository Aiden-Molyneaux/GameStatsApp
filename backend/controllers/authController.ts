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
    if ('existingUser' in response) {
      return res.status(400).json({ error: 'User already exists.' });
    } 

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const postResponse = await postUser(username, hashedPassword);

    if ('error' in postResponse) {
      if (postResponse.error.code === 'USER_CREATION_FAILED') {
        res.status(400).json({ error: postResponse.error });
        return;
      }

      if (postResponse.error.code === 'DATABASE_ERROR') {
        res.status(500).json({ 
          error: {
            code: 'SERVER_ERROR',
            message: 'User creation service unavailable.' 
          }
        });
        return;
      }

      res.status(500).json({ 
        error: {
          code: 'SERVER_ERROR',
          message: 'Something on the server went wrong.'
        }
      });
      return;
    }

    const user = postResponse.user;

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    return res.status(201).json({ token, user });
  } catch (err) {
    console.error('Unexpected error during registration:', err);

    return res.status(500).json({ 
      error: {
        code: 'SERVER_ERROR',
        message: 'Something on the server went wrong.'
      }
    });
  }
};

export async function handleLogin(req: Request, res: Response): Promise<void> {
  console.log('Handling request to login user...');
  const { username, password } = req.body;

  try {
    const response = await findUserByUsername(username);

    console.log({response});

    if ('error' in response) {
      if (response.error.code === 'USER_NOT_FOUND') {
        res.status(404).json({
          error: {
            code: 'AUTH_FAILED',
            message: 'Invalid credentials.'
          }
        });
        return
      }
      
      if (response.error.code === 'DATABASE_ERROR') {
        res.status(500).json({ 
          error: {
            code: 'SERVER_ERROR',
            message: 'Authentication service unavailable.' 
          }
        });
        return;
      }
      
      // Handle any other errors
      res.status(500).json({ 
        error: {
          code: 'SERVER_ERROR',
          message: 'Something on the server went wrong.'
        }
      });
      return;
    }

    const user = response.user;

    const isMatch = await bcrypt.compare(password, user.passwordDigest);
    if (!isMatch) {
      res.status(404).json({ 
        error: {
          code: 'AUTH_FAILED',
          message: 'Invalid credentials.'
        }
      });
      return;
    }
  
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    res.status(200).json({ token, user });
  } catch (err) {
    console.error('Unexpected error during login:', err);

    res.status(500).json({ 
      error: { 
        code: 'SERVER_ERROR',
        message: 'Something on the server went wrong.'
      }
    });
  }
};

export async function handleValidation(req: Request, res: Response): Promise<void> {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ 
      error: {
        code: 'UNAUTHORIZED',
        message: 'No token provided'
      }
    });
    return;
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET as string);
    res.status(200).send();
  } catch (err) {
    res.status(401).json({ error: {
        code: 'UNAUTHORIZED',
        message: 'Invalid token'
      }
    });
    return;
  }
}