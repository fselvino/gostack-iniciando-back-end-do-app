import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

/**
 * [ * ] Recebimento das informaçoes
 * [ * ] Tratativas de erros/excessoes
 * [ ] Acesso ao repositorio
 */

interface RequestDTO {
  date: Date;
  provider_id: string;
}
/**
 * Dependency Inversion (SOLID)
 */
class CreateAppointmentService {
  public async execute({
    date,
    provider_id,
  }: RequestDTO): Promise<Appointment> {
    const appointmensReprossitory = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    // realiza a busca por uma data ja agendada
    const findAppointmentInSameDate = await appointmensReprossitory.findByDate(
      appointmentDate,
    );

    // Se existir a data retorna erro de agendamento.
    if (findAppointmentInSameDate) {
      throw new AppError('Já existe um agendamento para esse horário');
    }

    const appointment = appointmensReprossitory.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmensReprossitory.save(appointment);

    return appointment;
  }
}
export default CreateAppointmentService;
