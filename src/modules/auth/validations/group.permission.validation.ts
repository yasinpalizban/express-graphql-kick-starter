import { IsString } from "class-validator";

export class GroupPermissionValidation {
  constructor(init?:Partial<GroupPermissionValidation>) {
    Object.assign(this, init);

  }
  @IsString()
  public groupId: string;
  @IsString()
  public actions: string;


}
