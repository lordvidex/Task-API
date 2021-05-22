import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthStrategy } from './auth.strategy';
import { UserRepository } from './user.repository';
import * as config from 'config';

const jwtConfig: any = config.get('jwt');
console.log(jwtConfig);
@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthStrategy],
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secretKey,
      signOptions: { expiresIn: jwtConfig.expiresIn },
    }),
  ],
  exports: [AuthStrategy, PassportModule],
})
export class AuthModule {}
