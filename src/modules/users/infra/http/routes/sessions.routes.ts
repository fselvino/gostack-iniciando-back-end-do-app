import { Router } from 'express';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();

// cria uma sessão
sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const autheticateUser = new AuthenticateUserService();

  const { user, token } = await autheticateUser.execute({ email, password });

  delete user.password;

  return response.json({ user, token });
});
export default sessionsRouter;
