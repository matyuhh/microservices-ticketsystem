import express from 'express';
import mongoose from 'mongoose';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import currentUserRouter from './routes/current-user';
import signinRouter from './routes/signin';
import signoutRouter from './routes/signout';
import signupRouter from './routes/signup';
import errorHandler from './middlewares/error-handler';
import NotFoundError from './errors/not-found-error';

const app = express();
app.set('trust proxy', true);

app.use(json());
app.use(cookieSession({
  signed: false,
  secure: true,
}));

// Routes
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async () => {
  throw new NotFoundError();
});

// Post Middleware
app.use(errorHandler);

const start = async (): Promise<void> => {
  if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET must be defined');

  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.info('Connected to database');
  } catch (err: unknown) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.info('Listening on port 3000');
  });
};

start();
