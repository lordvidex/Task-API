import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCredentialDto } from './dto/user-credential.dto';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}
  async signUp(
    userCredentialDto: UserCredentialDto,
  ): Promise<JwtPayload & { access_token: string }> {
    const userData: JwtPayload = await this.userRepository.signUp(
      userCredentialDto,
    );
    return { ...userData, access_token: this.jwtService.sign(userData) };
  }
  async logIn(
    userCredentialDto: UserCredentialDto,
  ): Promise<{ access_token: string }> {
    const user: User = await this.userRepository.logIn(userCredentialDto);
    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const payload: JwtPayload = { username: user.username, id: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }
}
