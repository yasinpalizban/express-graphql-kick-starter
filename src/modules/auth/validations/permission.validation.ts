import { IsBoolean, IsString } from "class-validator";

export class PermissionValidation {
  constructor(init?:Partial<PermissionValidation>) {

    Object.assign(this, init);
  }
  @IsString()
  public name: string;
  @IsString()
  public description: string;
  @IsBoolean()
  public active: boolean;


}
