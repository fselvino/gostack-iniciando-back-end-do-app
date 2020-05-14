/**
 * Esse objeto sera responsavel por: criar, ler, deletar, atualizar
 * todo processo de persistencia
 */

import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}
class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public findByDate(date: Date): Appointment | null {
    const findAppointment = this.appointments.find(appoint =>
      isEqual(date, appoint.date),
    );
    return findAppointment || null;
  }

  public all(): Appointment[] {
    return this.appointments;
  }

  // Ao enves de receber paramentros create recebe um objeto
  public create({ provider, date }: CreateAppointmentDTO): Appointment {
    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment);
    return appointment;
  }
}
export default AppointmentsRepository;
