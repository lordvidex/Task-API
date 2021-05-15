import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Constants } from '../constants';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthStrategy } from './auth.strategy';
import { UserRepository } from './user.repository';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthStrategy],
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: Constants.jwtPrivateKey,
      signOptions: { expiresIn: 3600 },
    }),
  ],
  exports: [AuthStrategy, PassportModule],
})
export class AuthModule {}
