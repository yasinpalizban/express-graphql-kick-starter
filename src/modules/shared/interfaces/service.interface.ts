import { PaginateSearch } from "../libraries/paginateSearch";

export declare interface ServiceInterface {

  index?(paginateSearch?: PaginateSearch): Promise<any[] | any>;

  show?(id: string): Promise<any>;

  create?(data: any): Promise<void | any>;

  update?(id: string, data: any): Promise<void | any>;

  delete?(id: string, foreignKey?: string): Promise<void>;

}


