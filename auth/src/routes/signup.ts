import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import User from '../models/user';
import validateRequest from '../middlewares/validate-request';
import BadRequestError from '../errors/bad-request-error';

const router = Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new BadRequestError('Email in use');

    const user = await User.create({ email, password });

    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
    );

    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  },
);

export default router;
