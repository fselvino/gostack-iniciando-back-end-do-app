import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICacheProvider from '@shared/container/provider/CacheProvider/models/ICacheProvider';
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

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
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
      provider_id
    );

    // Se existir a data retorna erro de agendamento.
    if (findAppointmentInSameDate) {
      throw new AppError('Já existe um agendamento para esse horário');
    }

    // persiste a notificaçao no bando mongodb
    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    const dateFormated = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'");
    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para o dia ${dateFormated}`,
    });

    await this.cacheProvider.invalidate(
      `provider-appointments:${provider_id}:${format(
        appointmentDate,
        'yyyy-M-d',
      )}`,
    );

    return appointment;
  }
}
export default CreateAppointmentService;
