import { Response, NextFunction } from 'express';

import { JwtPayload, verify } from 'jsonwebtoken';

import TokenUserInterface from '../interfaces/tokenUserInterfaces';

// declare namespace Express { export interface Request { user?: { id: string; } } }

const JWT_SECRET = 'meusegredo';

/* declare global {
  namespace Express {
    interface Request{
      user: TokenDataInterface
    }
  }
} */

const verifyToken = (token: string) => {
  try {
    return verify(token, JWT_SECRET, { algorithms: ['HS256'] });
  } catch (err) {
    throw new Error('Invalid token');
  }
};

const validateToken = async (req: TokenUserInterface, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Token not found' });
  }

  try {
    const decoded = verifyToken(token);
    
    const decodedFn = decoded as JwtPayload;

    req.user = { id: decodedFn.id, username: decodedFn.username };

    next();
  } catch (err) {
    return next(err);
  }
};

export default validateToken;