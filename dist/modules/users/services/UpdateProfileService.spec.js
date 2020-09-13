"use strict";

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/hashProvider/fakes/FakeHashProvider"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _UpdateProfileService = _interopRequireDefault(require("./UpdateProfileService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeHashProvider;
let updateProfile;
describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    updateProfile = new _UpdateProfileService.default(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Johon Doe',
      email: 'johndoe@example.com.br',
      password: '123456'
    });
    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'john Tre',
      email: 'johntre@example.com.br'
    });
    expect(updatedUser.name).toBe('john Tre');
    expect(updatedUser.email).toBe('johntre@example.com.br');
  });
  it('should not be able update the profile from non-existing user', async () => {
    expect(updateProfile.execute({
      user_id: 'non-existing-user-id',
      name: 'Test',
      email: 'test@example.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com.br',
      password: '123456'
    });
    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@example.com.br',
      password: '123456'
    });
    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'John tre',
      email: 'johndoe@example.com.br'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should be able update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Johon Doe',
      email: 'johndoe@example.com.br',
      password: '123456'
    });
    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'john Tre',
      email: 'johntre@example.com.br',
      old_password: '123456',
      password: '123123'
    });
    expect(updatedUser.password).toBe('123123');
  });
  it('should no be able update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Johon Doe',
      email: 'johndoe@example.com.br',
      password: '123456'
    });
    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'john Tre',
      email: 'johntre@example.com.br',
      password: '123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should no be able update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Johon Doe',
      email: 'johndoe@example.com.br',
      password: '123456'
    });
    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'john Tre',
      email: 'johntre@example.com.br',
      old_password: 'wrong-old-password',
      password: '123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});