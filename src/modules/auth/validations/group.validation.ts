import {  IsString } from "class-validator";

export class GroupValidation {
  constructor(init?:Partial<GroupValidation>) {
    Object.assign(this, init);

  }
  @IsString()
  public name: string;
  @IsString()
  public description: string;


}
