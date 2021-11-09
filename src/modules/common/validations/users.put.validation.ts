import { IsString, IsAlphanumeric, IsOptional, IsBoolean } from "class-validator";

export class UsersPutValidation {
  constructor(init?:Partial<UsersPutValidation>) {
    Object.assign(this, init);

  }
  @IsString() @IsOptional()
  public password: string;
  @IsString() @IsOptional()
  public role: string;
  @IsOptional()  @IsString()
  public firstName: string;
  @IsOptional()  @IsString()
  public lastName: string;
  @IsOptional()  @IsBoolean()
  public status: boolean;
}
