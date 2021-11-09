import {IsEmail, IsString} from 'class-validator';

export class AuthSendActivateEmailValidation {

  constructor(init?:Partial<AuthSendActivateEmailValidation>) {
    Object.assign(this, init);

  }
  @IsString() @IsEmail()
  public email: string;

}
