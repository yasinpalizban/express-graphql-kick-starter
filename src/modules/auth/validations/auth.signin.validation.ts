import {IsString,IsOptional, MaxLength, MinLength} from 'class-validator';

export class AuthSigninValidation {
  constructor(init?:Partial<AuthSigninValidation>) {

    Object.assign(this, init);
  }
  @IsString()
  public login: string;
  @IsString()  @MinLength(4) @MaxLength(12)
  public password: string;
  @IsOptional()
  public remember;

}
