import {IsEmail, IsString, MaxLength, MinLength} from 'class-validator';
import {IsEqualTo} from "../uitls/is.equal.to";

export class AuthResetPasswordPhoneValidation {
  constructor(init?:Partial<AuthResetPasswordPhoneValidation>) {
    Object.assign(this, init);

  }

  @IsString()
  public phone: string;
  @IsString()
  public resetToken: string;
  @IsString()   @MinLength(4) @MaxLength(12)
  public password: string;
  @IsString() @IsEqualTo('password')
  public passwordConfirm: string;

}
