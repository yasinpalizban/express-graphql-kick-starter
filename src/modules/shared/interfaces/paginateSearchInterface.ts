export interface PaginateSearchInterface {

  getPipeLine(defaultPipeline?: AggregatePipeLine[]): AggregatePipeLine[];

  subDocumentPagination(): void;

  decodeQueryParam(): this;

  resetPipeLine(): this
}

export interface IPaginate {
  limit?: number;
  range?: string;
  page?: number;
  order?: number;
  sort?: string;

}

export interface AggregatePipeLine {
  $sort?: object;
  $project?: object | any;
  $match?: object | any;
  $elemMatch?: object | any;
  $group?: object;
  $limit?: number;
  $page?: number;
  $skip?: number;
  $unwind?: any;
  $replaceRoot?: object | any;
  $addFields?: object | any;
  $lookup?: object | any;
  $unionWith?: any | object;
  $merge?: any | object;
  $set?: any | object;

}

export interface IOptionPagination {
  limit: number;
  page: number;
}

export interface ISearch {
  filed: string;
  sign?: string | undefined;
  signs?: string[] | undefined;
  value: string | undefined;
  values: string[] | undefined;
  method: string ;
  subDoc?: string | null | undefined;
  join?: string | null | undefined;
}
