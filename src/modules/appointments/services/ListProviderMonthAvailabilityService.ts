import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointementsRepository';

// import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}
// esse padrão de declaraçao e quando desejamos usar Array
type IResponse = Array<{
  day: number;
  available: boolean;
}>;
/**
 * [ { day: 1, available: false }]
 */
@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) { }

  public async execute({
    provider_id,
    year,
    month,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
      {
        provider_id,
        month,
        year,
      },
    );
    console.log(appointments);
    return [{ day: 1, available: false }];
  }
}

export default ListProviderMonthAvailabilityService;
