import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterRequest {
  @IsEmail()
  public readonly email: string;

  @IsNotEmpty()
  public readonly password: string;
}
