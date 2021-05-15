import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCredentialDto } from './dto/user-credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  async signUp(@Body(ValidationPipe) userCredentialDto: UserCredentialDto) {
    return await this.authService.signUp(userCredentialDto);
  }

  @Post('/login')
  async logIn(@Body(ValidationPipe) userCredentialDto: UserCredentialDto) {
    return await this.authService.logIn(userCredentialDto);
  }
}
