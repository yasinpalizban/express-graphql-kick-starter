import {IsEmail, IsString} from 'class-validator';

export class AuthActivateTokenEmailValidation {

  constructor(init?:Partial<AuthActivateTokenEmailValidation>) {
    Object.assign(this, init);

  }
  @IsString()
  public activeToken: string;
  @IsEmail()
  public email: string;
}
