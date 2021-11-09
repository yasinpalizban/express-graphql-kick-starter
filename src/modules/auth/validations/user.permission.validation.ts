import { IsString } from "class-validator";

export class UserPermissionValidation {
  constructor(init?:Partial<UserPermissionValidation>) {
    Object.assign(this, init);

  }
  @IsString()
  public userId: string;
  @IsString()
  public actions: string;


}
