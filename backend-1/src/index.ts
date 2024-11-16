import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectToDatabase from './config/db';
import { APP_ORIGIN, NODE_ENV, PORT } from './constants/env';
import cookieParser from 'cookie-parser';
import errorHandler from './middleware/errorHandler';
import { asyncHandler } from './utils/asyncHandler';
import authRoutes from './routes/auth.route';
import { OK } from './constants/http';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: APP_ORIGIN, credentials: true }));
app.use(cookieParser());

app.get(
  '/health',
  asyncHandler(async (req, res) => {
    res.status(OK).json({ status: 'healthy' });
  }),
);

app.use('/auth', authRoutes);

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`server running on port ${PORT} in ${NODE_ENV} environment`);
  await connectToDatabase();
});
