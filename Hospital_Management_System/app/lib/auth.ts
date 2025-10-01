import jwt from 'jsonwebtoken';

export interface JWTPayload {
  id: number;
  email: string;
  role: string;
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}
