import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserSevice';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);
    const user = await createUser.execute({
      name: 'Johon Doe',
      email: 'johondoe@example.com.br',
      password: '121212',
    });
    expect(user).toHaveProperty('id');
  });
  it('should be able to create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);
    await createUser.execute({
      name: 'Johon Doe',
      email: 'johondoe@example.com.br',
      password: '121212',
    });
    expect(
      createUser.execute({
        name: 'Johon Doe',
        email: 'johondoe@example.com.br',
        password: '121212',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
