import {IsString} from 'class-validator';

export class AuthForgotValidation {
  constructor(init?:Partial<AuthForgotValidation>) {

    Object.assign(this, init);
  }
  @IsString()
  public login: string;

}
