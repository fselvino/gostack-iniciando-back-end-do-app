/**
 * Soc: Separation od Concerns - Separançao de preocupaçoes
 */

// DTO - Data Transfer Object - Objeto de transferencia de dados

// Rota: Recebe a requisiçao, chamar outro arquivo, devolver uma resposta

import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmetsController from '../../controllers/AppointmetsController';

const appointmetRoutes = Router();
const appointmentsController = new AppointmetsController();

appointmetRoutes.use(ensureAuthenticated);

appointmetRoutes.post('/', appointmentsController.create);
export default appointmetRoutes;
