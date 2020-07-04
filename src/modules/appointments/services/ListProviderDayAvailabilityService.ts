import { injectable, inject } from 'tsyringe';
import { getHours } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointementsRepository';

// import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
  day: number;
}
// esse padrão de declaraçao e quando desejamos usar Array
type IResponse = Array<{
  hour: number;
  available: boolean;
}>;
/**
 * [ { day: 1, available: false }]
 */
@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) { }

  public async execute({
    provider_id,
    year,
    month,
    day,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        provider_id,
        year,
        month,
        day,
      },
    );
    const hourStart = 8;
    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart,
    );
    console.log(eachHourArray);
    const availablility = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointments.find(
        appointment => getHours(appointment.date) === hour,
      );

      return {
        hour,
        available: !hasAppointmentInHour,
      };
    });
    console.log(availablility);
    return availablility;
  }
}

export default ListProviderDayAvailabilityService;
