import { container } from 'tsyringe';

import '@modules/users/providers';
import './provider';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointementsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRespository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

// import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
// import UserTokensRepository from

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

// container.registerSingleton<IUsersRepository>(
//   'UserTokensRepository',
//   UserTokensRepository,
// );
