import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UsersController from '../../Controllers/UsersController';
import UserAvatarController from '../../Controllers/UserAvatarContoller';

const usersRoutes = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

// rota de criar usuarios
usersRoutes.post('/', usersController.create);

usersRoutes.patch('/avatar', ensureAuthenticated, userAvatarController.update);
export default usersRoutes;
