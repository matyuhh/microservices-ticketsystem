import mongoose from 'mongoose';

import app from './app';

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
