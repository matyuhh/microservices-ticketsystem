import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();

router.get(
  '/api/users/currentuser',
  (req: Request, res: Response) => {
    if (!req.session?.jwt) {
      res.send({ currentUser: null });
      return;
    }

    try {
      const payload = jwt.verify(req.session.jwt, process.env.JWT_SECRET);
      res.send({ currentUser: payload });
    } catch (err) {
      res.send({ currentUser: null });
    }
  },
);

export default router;
