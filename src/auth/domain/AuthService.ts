import { LoginReturnType } from 'src/graphql';
import { LoginUser } from 'src/user/dto/login-user.input';

export interface AuthService {
  login(loginUser: LoginUser): Promise<LoginReturnType>;
}
