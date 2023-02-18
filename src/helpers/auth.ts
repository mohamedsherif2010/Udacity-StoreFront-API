import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

export function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  try {
    const authHeader: string | undefined = req.headers.authorization;
    const token: string = authHeader ? authHeader.split(' ')[1] : '';

    res.locals.userData = jwt.verify(token, process.env.TOKEN_SECRET as string);
    return next();
  } catch (err) {
    res.status(401);
    res.json('Access denied, invalid token');
  }
}
