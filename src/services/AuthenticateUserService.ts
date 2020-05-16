import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error('Incorrect email/password combination');
    }

    // user.password - Senha criptografada
    // password - Senha não-criptografada

    const passwordMacthed = await compare(password, user.password);

    // se não passar retorna erro
    if (!passwordMacthed) {
      throw new Error('Incorrect email/password combination');
    }

    const token = sign({}, '62521b9b04a66c37bb28ec4bf299360f', {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
