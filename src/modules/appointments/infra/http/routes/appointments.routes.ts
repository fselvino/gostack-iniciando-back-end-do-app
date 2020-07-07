/**
 * Soc: Separation od Concerns - Separançao de preocupaçoes
 */

// DTO - Data Transfer Object - Objeto de transferencia de dados

// Rota: Recebe a requisiçao, chamar outro arquivo, devolver uma resposta

import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmetsController from '../../controllers/AppointmetsController';
import ProviderAppointmentsController from '../../controllers/ProviderAppointmentsController';

const appointmetRoutes = Router();
const appointmentsController = new AppointmetsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmetRoutes.use(ensureAuthenticated);

appointmetRoutes.post('/', appointmentsController.create);
appointmetRoutes.get('/me', providerAppointmentsController.index);
export default appointmetRoutes;
