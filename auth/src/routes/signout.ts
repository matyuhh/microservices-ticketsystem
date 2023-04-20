import { Router, Request, Response } from 'express';

const router = Router();

router.get('/api/users/signout', (req: Request, res: Response) => {
  res.send('Hello');
});

export default router;
