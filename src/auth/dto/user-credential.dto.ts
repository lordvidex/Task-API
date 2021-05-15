import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class UserCredentialDto {
  @IsString()
  readonly username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Weak password',
  })
  readonly password: string;
}
