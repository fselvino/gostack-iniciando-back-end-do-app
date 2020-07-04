/**
 * Soc: Separation od Concerns - Separançao de preocupaçoes
 */

// DTO - Data Transfer Object - Objeto de transferencia de dados

// Rota: Recebe a requisiçao, chamar outro arquivo, devolver uma resposta

import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../../controllers/ProvidersController';

const providersRoutes = Router();
const providersController = new ProvidersController();

providersRoutes.use(ensureAuthenticated);

providersRoutes.get('/', providersController.index);
export default providersRoutes;
