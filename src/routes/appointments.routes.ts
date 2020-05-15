/**
 * Soc: Separation od Concerns - Separançao de preocupaçoes
 */

// DTO - Data Transfer Object - Objeto de transferencia de dados

// Rota: Recebe a requisiçao, chamar outro arquivo, devolver uma resposta

import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmetsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmetService';

const appointmetRoutes = Router();

appointmetRoutes.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmetsRepository);
  const appointments = await appointmentsRepository.find();
  return response.json(appointments);
});

// rota de agendamentos
appointmetRoutes.post('/', async (request, response) => {
  try {
    const { provider, date } = request.body;

    // formata a data vindo da aplicaçao
    const parseDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();
    const appointment = await createAppointment.execute({
      date: parseDate,
      provider,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});
export default appointmetRoutes;
