/**
 * Esse objeto sera responsavel por: criar, ler, deletar, atualizar
 * todo processo de persistencia
 */

import { EntityRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointementsRepository';
import Appointment from '../entities/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment>
  implements IAppointmentsRepository {
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.findOne({
      where: { date },
    });
    return findAppointment;
  }
}
export default AppointmentsRepository;