import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

// import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/provider/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;

let listProviders: ListProvidersService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviders = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });
  it('should be able to the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Johon Doe',
      email: 'johndoe@example.com.br',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Johon Tre',
      email: 'johntre@example.com.br',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Johon Qua',
      email: 'johnqua@example.com.br',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });
    expect(providers).toEqual([user1, user2]);
  });
});
