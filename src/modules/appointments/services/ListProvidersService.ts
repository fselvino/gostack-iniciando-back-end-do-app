import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepository from '@modules/users/repositories/IUsersRespository';

import ICacheProvider from '@shared/container/provider/CacheProvider/models/ICacheProvider';

interface IRequest {
  user_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) { }

  public async execute({ user_id }: IRequest): Promise<User[]> {
    // let users = await this.cacheProvider.recover<User[]>(
    //   `providers-list:${user_id}`,
    // );

    // limpar o cache
    let users;

    if (!users) {
      users = await this.usersRepository.findAllProviders({
        except_user_id: user_id,
      });

      // console.log('A query no banco foi feita');

      await this.cacheProvider.save(
        `providers-list:${user_id}`,
        classToClass(users),
      );
    }
    // console.log(users);
    return users;
  }
}

export default ListProvidersService;
