import { Router } from 'express';
import SessionsController from '../../Controllers/SessionsController';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

// cria uma sessão
sessionsRouter.post('/', sessionsController.create);
export default sessionsRouter;
