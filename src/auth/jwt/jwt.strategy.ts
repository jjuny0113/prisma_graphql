import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from './jwt.payload';
import { UserRepository } from 'src/user/domain/UserRepository';
import { JwtStrategy } from '../domain/JwtStrategy';
import { UserInjectionToken } from 'src/user/UserInjectionToken';

@Injectable()
export class JwtStrategyImpl
  extends PassportStrategy(Strategy, 'jwt')
  implements JwtStrategy
{
  constructor(
    @Inject(UserInjectionToken.USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY,
      ignoreExpiration: false,
    });
  }

  async validate(payload: Payload) {
    const user = await this.userRepository.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('접근오류');
    }
    return user;
  }
}
