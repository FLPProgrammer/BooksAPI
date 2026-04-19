import { Router } from 'express';
import { bookRoutes } from './BookRoutes';

export const routes = Router();

routes.use('/api', bookRoutes)