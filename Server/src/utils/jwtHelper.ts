import * as dotenv from 'dotenv';
dotenv.config();
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
