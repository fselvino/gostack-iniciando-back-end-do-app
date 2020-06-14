/**
 * Esse objeto sera responsavel por: criar, ler, deletar, atualizar
 * todo processo de persistencia
 */
import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointementsRepository';
import ICreateAppointDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import Appointment from '../../infra/typeorm/entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );
    return findAppointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id });

    this.appointments.push(appointment);

    return appointment;
  }
}
export default AppointmentsRepository;
