import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import dotenv from 'dotenv';
dotenv.config();

interface JwtPayload {
  _id: unknown;
  username: string;
  email: string,
}

const secretKey = process.env.JWT_SECRET_KEY || '';

export const authenticateToken = (authHeader?: string): JwtPayload | null => {
  if (!authHeader)
    return null

    const token = authHeader.split(' ')[1];
try {
    const user = jwt.verify(token, secretKey) as JwtPayload;
    return user;
      } catch (error) {
        console.error('Invalid Token:', error);
        return null;
      }
};

export const signToken = (username: string, email: string, _id: unknown) => {
  const payload = { username, email, _id };
  const secretKey = process.env.JWT_SECRET_KEY || '';

  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};


export class AuthenticationError extends GraphQLError {
  constructor(message: string) {
    super(message, undefined, undefined, undefined, ['UNAUTHENTICATED']);
    Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
  }
}