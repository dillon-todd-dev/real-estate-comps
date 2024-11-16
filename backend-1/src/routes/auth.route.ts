import { Router } from 'express';
import {
  loginHandler,
  logoutHandler,
  refreshHandler,
  registerHandler,
} from '../controllers/auth.controller';

const authRoutes = Router();

// POST /auth/register
authRoutes.post('/register', registerHandler);

// POST /auth/login
authRoutes.post('/login', loginHandler);

// GET /auth/logout
authRoutes.get('/logout', logoutHandler);

// GET /auth/refresh
authRoutes.get('/refresh', refreshHandler);

export default authRoutes;
