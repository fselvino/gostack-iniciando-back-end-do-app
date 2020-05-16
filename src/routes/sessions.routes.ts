import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

// cria uma sessão
sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const autheticateUser = new AuthenticateUserService();

    const { user, token } = await autheticateUser.execute({ email, password });

    delete user.password;

    return response.json({ user, token });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});
export default sessionsRouter;
