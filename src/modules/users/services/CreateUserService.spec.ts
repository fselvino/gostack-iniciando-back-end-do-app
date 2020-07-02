import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/hashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserSevice';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Johon Doe',
      email: 'johondoe@example.com.br',
      password: '121212',
    });
    expect(user).toHaveProperty('id');
  });
  it('should be able to create a new user with same email from another', async () => {
    await createUser.execute({
      name: 'Johon Doe',
      email: 'johondoe@example.com.br',
      password: '121212',
    });
    await expect(
      createUser.execute({
        name: 'Johon Doe',
        email: 'johondoe@example.com.br',
        password: '121212',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
