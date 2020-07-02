import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/hashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Johon Doe',
      email: 'johndoe@example.com.br',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'john Tre',
      email: 'johntre@example.com.br',
    });
    expect(updatedUser.name).toBe('john Tre');
    expect(updatedUser.email).toBe('johntre@example.com.br');
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com.br',
      password: '123456',
    });
    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@example.com.br',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John tre',
        email: 'johndoe@example.com.br',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Johon Doe',
      email: 'johndoe@example.com.br',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'john Tre',
      email: 'johntre@example.com.br',
      old_password: '123456',
      password: '123123',
    });
    expect(updatedUser.password).toBe('123123');
  });

  it('should no be able update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Johon Doe',
      email: 'johndoe@example.com.br',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'john Tre',
        email: 'johntre@example.com.br',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should no be able update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Johon Doe',
      email: 'johndoe@example.com.br',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'john Tre',
        email: 'johntre@example.com.br',
        old_password: 'wrong-old-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
