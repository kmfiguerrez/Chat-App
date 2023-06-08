import * as dotenv from 'dotenv';
dotenv.config();
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export function generateToken(payload: object): string {
  return jwt.sign(payload, process.env.JWT_TOKEN_SECRET!);
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, process.env.JWT_TOKEN_SECRET!);
  } catch (err) {
    throw new Error('Invalid token');
  }
}

export function authenticateToken(req: Request, res: Response, next: NextFunction): void {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ error: 'No token provided' });
    return;
  }

  try {
    const decodedToken = verifyToken(token);
    req.user = decodedToken;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid token' });
  }
}
