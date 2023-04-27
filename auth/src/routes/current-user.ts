import { Router, Request, Response } from 'express';

import currentUser from '@mgmts/common/build/middlewares/current-user';

const router = Router();

router.get(
  '/api/users/currentuser',
  currentUser,
  (req: Request, res: Response) => {
    res.send({ currentUser: req.currentUser || null });
  },
);

export default router;
