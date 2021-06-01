import { EntityRepository, Repository } from 'typeorm';
import { UserCredentialDto } from './dto/user-credential.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  /**
   *
   * @param userCredentialDto UserCredentials containing username and password
   * @returns user data without the password from the db
   */
  async signUp(userCredentialDto: UserCredentialDto) {
    const { username, password } = userCredentialDto;
    const user: User = new User();

    // set the username
    user.username = username;
    // generate a salt
    const salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, salt);

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = await user.save();
      return result;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exist');
      }
      throw new InternalServerErrorException();
    }
  }

  /**
   * tries to login user with provided data
   * @param userCredentialDto username and password
   * @returns user data if successful
   */
  async logIn(userCredentialDto: UserCredentialDto): Promise<User> {
    const { username, password } = userCredentialDto;
    const user = await this.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    throw new BadRequestException('Invalid username or password');
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }
}
