import {IsEmail, IsString} from 'class-validator';

export class AuthSendActivatePhoneValidation {

  constructor(init?:Partial<AuthSendActivatePhoneValidation>) {
    Object.assign(this, init);

  }
  @IsString()
  public phone: string;

}
