/**
 * Soc: Separation od Concerns - Separançao de preocupaçoes
 */

// DTO - Data Transfer Object - Objeto de transferencia de dados

// Rota: Recebe a requisiçao, chamar outro arquivo, devolver uma resposta

import { Router } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmetService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmetRoutes = Router();

appointmetRoutes.use(ensureAuthenticated);

// appointmetRoutes.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();
//   return response.json(appointments);
// });

// rota de agendamentos
appointmetRoutes.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  // formata a data vindo da aplicaçao
  const parseDate = parseISO(date);

  const createAppointment = container.resolve(CreateAppointmentService);
  const appointment = await createAppointment.execute({
    date: parseDate,
    provider_id,
  });

  return response.json(appointment);
});
export default appointmetRoutes;
