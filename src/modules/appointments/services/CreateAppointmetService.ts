import { startOfHour, isBefore, getHours } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointementsRepository';

/**
 * [ * ] Recebimento das informaçoes
 * [ * ] Tratativas de erros/excessoes
 * [ * ] Acesso ao repositorio
 */

interface IRequest {
  date: Date;
  provider_id: string;
  user_id: string;
}
/**
 * Dependency Inversion (SOLID)
 */
@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) { }

  public async execute({
    date,
    provider_id,
    user_id,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);
    // console.log(appointmentDate);
    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("You can't create an appointemt on a past date");
    }
    // console.log(Date.now());
    if (user_id === provider_id) {
      throw new AppError("You can't create an appointemt with yourself");
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError(
        'You can only create appointments between 8am and 5pm',
      );
    }
    // realiza a busca por uma data ja agendada
    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    // Se existir a data retorna erro de agendamento.
    if (findAppointmentInSameDate) {
      throw new AppError('Já existe um agendamento para esse horário');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    return appointment;
  }
}
export default CreateAppointmentService;
