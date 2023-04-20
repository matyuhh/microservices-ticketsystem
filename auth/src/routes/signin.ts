import { Router, Request, Response } from 'express';

const router = Router();

router.get('/api/users/signin', (req: Request, res: Response) => {
  res.send('Hello');
});

export default router;
