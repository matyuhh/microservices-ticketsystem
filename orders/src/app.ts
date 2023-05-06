import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@mgmts/common';

import deleteOrderRouter from './routes/delete';
import showOrderRouter from './routes/show';
import newOrderRouter from './routes/new';
import indexOrderRouter from './routes/index';

const app = express();
app.set('trust proxy', true);

app.use(json());
app.use(cookieSession({
  signed: false,
  secure: process.env.NODE_ENV !== 'test',
}));
app.use(currentUser);

// Routes
app.use(deleteOrderRouter);
app.use(showOrderRouter);
app.use(newOrderRouter);
app.use(indexOrderRouter);

app.all('*', async () => {
  throw new NotFoundError();
});

// Post Middleware
app.use(errorHandler);

export default app;
