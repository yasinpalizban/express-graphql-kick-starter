import {
  AggregatePipeLine,
  IOptionPagination,
  ISearch,
  IPaginate,
  PaginateSearchInterface
} from "../interfaces/paginateSearchInterface";

import { SearchFunctionType } from "../enum/search.function";
import { changeKeyObject, convertFunctionType, convertSignType, parseString } from "../utils/parse.str.helper";
import { isEmpty } from "@/modules/shared/utils/is.empty";

export class PaginateSearch implements PaginateSearchInterface {

  private paginate: IPaginate;
  private search: ISearch;
  private _OptionPagination: IOptionPagination;
  private pipeLine: AggregatePipeLine[];


  constructor(pagination: IPaginate, search: ISearch, private isSubDocument: boolean) {


    let paginate: IPaginate = {};


    paginate.sort = paginate.sort ?? "_id";
    paginate.order = paginate.order ?? -1;
    paginate.page = paginate.page ?? 1;
    paginate.limit = paginate.limit ?? 10;


    this.search = search;
    this.paginate = paginate;
    this.pipeLine = [];

    if (isSubDocument == false) {
      this._OptionPagination = {
        limit: paginate.limit,
        page: paginate.page
      };
    } else {
      this._OptionPagination = {
        limit: paginate.limit,
        page: (paginate.page - 1) * paginate.limit
      };
    }


  }


  public getPipeLine(defaultPipeline?: AggregatePipeLine[]): AggregatePipeLine[] {


    if (this.paginate.sort) {
      let obj: AggregatePipeLine = { $sort: { $$$: +this.paginate.order } };
      obj = changeKeyObject(obj, "\"$$$\"", "\"" + this.paginate.sort + "\"");
      this.pipeLine.push(obj);
    }


    if (!isEmpty(defaultPipeline)) {

      const temp: AggregatePipeLine[] = this.pipeLine;
      this.pipeLine = defaultPipeline;
      this.pipeLine = [...this.pipeLine, ...temp];

    }

    return this.pipeLine;
  }


  get OptionPagination(): IOptionPagination {
    return this._OptionPagination;
  }

  public subDocumentPagination(): void {


    this._OptionPagination = {
      limit: this.paginate.limit,
      page: (this.paginate.page - 1) * this.paginate.limit
    };

  }


  decodeQueryParam(): this {


    if (isEmpty(this.search)) {
      return this;
    }


    if (convertFunctionType(this.search.method) == SearchFunctionType.match) {
      //    { $match: { <query> } }
      if (this.search.values != undefined) {
        for (let i = 0; i < this.search.values.length; i++) {
          let obj: any = { $$$: this.search.values[i] };
          obj = changeKeyObject(obj, "\"$$$\"", "\"" + convertSignType(this.search.signs[i]) + "\"");
          obj = { $$$: obj };
          obj = changeKeyObject(obj, "\"$$$\"", "\"" + this.search.filed + "\"");
          obj = { $$$: obj };
          obj = changeKeyObject(obj, "\"$$$\"", "\"" + convertFunctionType(this.search.method) + "\"");
          this.pipeLine.push(obj);

        }

      } else if (this.search.sign != undefined) {
        let obj: any = { $$$: this.search.value };
        obj = changeKeyObject(obj, "\"$$$\"", "\"" + convertSignType(this.search.sign) + "\"");
        obj = { $$$: obj };
        obj = changeKeyObject(obj, "\"$$$\"", "\"" + this.search.filed + "\"");
        obj = { $$$: obj };
        obj = changeKeyObject(obj, "\"$$$\"", "\"" + convertFunctionType(this.search.method) + "\"");
        this.pipeLine.push(obj);

      } else {

        let obj: any = { $$$: this.search.value };
        obj = changeKeyObject(obj, "\"$$$\"", "\"" + this.search.filed + "\"");
        obj = { $$$: obj };
        obj = changeKeyObject(obj, "\"$$$\"", "\"" + convertFunctionType(this.search.method) + "\"");
        this.pipeLine.push(obj);
      }

    }
    if (convertFunctionType(this.search.method) == SearchFunctionType.nin ||
      convertFunctionType(this.search.method) == SearchFunctionType.in) {
      // pattern { field: { $nin: [<value1>, <value2>, ... <valueN> ] } }
      let obj: any = { $$$: this.search.values };
      obj = changeKeyObject(obj, "\"$$$\"", "\"" + convertFunctionType(this.search.method) + "\"");
      obj = { $$$: obj };
      obj = changeKeyObject(obj, "\"$$$\"", "\"" + this.search.filed + "\"");
      this.pipeLine.push(obj);
    }
    if (convertFunctionType(this.search.method) == SearchFunctionType.regex) {
      // { <field>: { $regex: /pattern/, $options: '<options>' } }

      let obj: any = { $$$: this.search.value, $options: "i" };
      obj = changeKeyObject(obj, "\"$$$\"", "\"" + convertFunctionType(this.search.method) + "\"");
      obj = { $$$: obj };
      obj = changeKeyObject(obj, "\"$$$\"", "\"" + this.search.filed + "\"");
      this.pipeLine.push(obj);
    }


    return this;

  }

  public resetPipeLine(): this {
    this.pipeLine = [];
    return this;
  }

}
