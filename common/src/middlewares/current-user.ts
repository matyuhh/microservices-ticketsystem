import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload
    }
  }
}

declare module "jsonwebtoken" {
  export interface JwtPayload {
      id: string;
      email: string;
  }
}

const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.session?.jwt) return next();

  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_SECRET!) as UserPayload;
    req.currentUser = payload;
  } catch (err) { /* empty */ }

  return next();
};

export default currentUser;
