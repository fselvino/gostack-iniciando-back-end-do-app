import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmetService';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;

    // formata a data vindo da aplicaçao
    const parseDate = parseISO(date);

    const createAppointment = container.resolve(CreateAppointmentService);
    const appointment = await createAppointment.execute({
      date: parseDate,
      provider_id,
    });

    return response.json(appointment);
  }
}
