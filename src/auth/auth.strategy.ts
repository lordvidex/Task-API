import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';

import { Strategy, ExtractJwt } from 'passport-jwt';
import { Constants } from 'src/constants';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Constants.jwtPrivateKey,
    });
  }
  async validate(jwtPayload: JwtPayload) {
    const user = await this.userRepository.findOne({
      username: jwtPayload.username,
    });
    if (!user) {
      throw new UnauthorizedException();
    }

    const { password, ...result } = user;
    return result;
  }
}
