import {IsEmail, IsString, Matches, MaxLength, MinLength} from 'class-validator';
import {IsEqualTo} from "../uitls/is.equal.to";

export class AuthResetPasswordEmailValidation {
  constructor(init?:Partial<AuthResetPasswordEmailValidation>) {

    Object.assign(this, init);
  }
  @IsString() @IsEmail()
  public email: string;
  @IsString()
  public resetToken: string;
  @IsString() @MinLength(4) @MaxLength(12)
  public password: string;
  @IsString() @IsEqualTo('password')
  public passwordConfirm: string;
}
