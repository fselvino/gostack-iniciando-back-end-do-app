import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
/**
 * [ * ] Recebimento das informaçoes
 * [ * ] Tratativas de erros/excessoes
 * [ ] Acesso ao repositorio
 */

interface RequestDTO {
  date: Date;
  provider: string;
}
/**
 * Dependency Inversion (SOLID)
 */
class CreateAppointmentService {
  private appointmensReprossitory: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmensReprossitory = appointmentsRepository;
  }

  public execute({ date, provider }: RequestDTO): Appointment {
    const appointmentDate = startOfHour(date);

    // realiza a busca por uma data ja agendada
    const findAppointmentInSameDate = this.appointmensReprossitory.findByDate(
      appointmentDate,
    );

    // Se existir a data retorna erro de agendamento.
    if (findAppointmentInSameDate) {
      throw Error('Já existe um agendamento para esse horário');
    }

    const appointment = this.appointmensReprossitory.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}
export default CreateAppointmentService;
