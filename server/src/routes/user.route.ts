import { Router } from 'express';
import { currentUserHandler } from '../controllers/user.controller';

const userRoutes = Router();

// GET /users/currentUser
userRoutes.get('/currentUser', currentUserHandler);

export default userRoutes;
