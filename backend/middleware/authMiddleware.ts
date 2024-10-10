import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: { id: number };
}

export function authorizeUser(req: AuthRequest, res: Response, next: NextFunction) {
  console.log('Authorizing User...');

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.error('-> User Authorization ERROR: no JWT token provided.');
    return res.status(401).json({ error: 'No JWT token provided.' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    // Type guard to check if the decoded value is a JwtPayload and contains an id
    if (typeof decoded === 'object' && decoded !== null && 'id' in decoded) {
      req.user = { id: (decoded as JwtPayload).id as number };

      console.log('-> User Authorizion SUCCESS');
      next();
    } else {
      console.error('-> User Authorization ERROR: invalid token structure.');
      return res.status(401).json({ error: 'Invalid token structure.' });
    }
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      console.error('-> User Authorization ERROR: token expired.');
      return res.status(401).json({ error: 'Token expired. Please log in again.' });
    } else {
      console.error('-> User Authorization ERROR:', err);
      return res.status(401).json({ error: err });
    }
  }
}

