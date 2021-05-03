import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginRequest {
  @IsEmail()
  public readonly email: string;

  @IsNotEmpty()
  public readonly password: string;
}
