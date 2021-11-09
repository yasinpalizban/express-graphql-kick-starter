import { IsBoolean, IsString } from "class-validator";

export class SettingValidation {
  constructor(init?:Partial<SettingValidation>) {
    Object.assign(this, init);

  }

  @IsString()
  public key: string;
  @IsString()
  public value: string;
  @IsString()
  public description: string;
  @IsBoolean()
  public status: boolean;


}
