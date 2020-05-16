import { getRepository } from 'typeorm';
import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    // busca pelo usuario informado pelo usuario
    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    // se o usuario existir retorna erro
    if (checkUserExists) {
      throw new Error('Email address already used');
    }

    // cria o usuario
    const user = usersRepository.create({
      name,
      email,
      password,
    });

    // persiste o usuario no banco
    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
