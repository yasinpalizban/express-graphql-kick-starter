import { IsString} from 'class-validator';

export class AuthActivateTokenPhoneValidation {
  constructor(init?:Partial<AuthActivateTokenPhoneValidation>) {
    Object.assign(this, init);

  }
  @IsString()
  public activeToken: string;
  @IsString()
  public phone: string;
}
