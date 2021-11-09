import { HttpException } from "../../../core/exceptions/HttpException";
import { isEmpty } from "./../../shared/utils/is.empty";
import { StatusCodes } from "http-status-codes";
import { default as i18n } from "i18next";
import { SettingModel } from "../models/setting.model";
import { ISetting, ISettingPagination } from "../interfaces/setting.interface";
import { SettingEntity } from "../entities/setting.entity";
import { ServiceInterface } from "./../../shared/interfaces/service.interface";
import { PaginateSearch } from "../../shared/libraries/paginateSearch";
import { AggregatePipeLine } from "../../shared/interfaces/paginateSearchInterface";
import { IPagination } from "./../../shared/interfaces/pagination";
import { ObjectId } from "bson";

export default class SettingService implements ServiceInterface {
  public settingModel = SettingModel;

  public async index(paginateSearch: PaginateSearch): Promise<ISettingPagination> {
    const pipeLine: AggregatePipeLine[] = paginateSearch.decodeQueryParam().getPipeLine();
    // @ts-ignore
    let pagination: IPagination = await this.settingModel.aggregatePaginate(this.settingModel.aggregate(pipeLine), paginateSearch.OptionPagination);
    const data: ISetting[] = pagination.docs;
    delete pagination.docs;

    return { data: data, pagination: pagination };
  }

  public async show(id: string): Promise<ISetting[]> {
    if (isEmpty(id)) throw new HttpException(StatusCodes.BAD_REQUEST, i18n.t("api.commons.validation"));


    const dataById: ISetting[] = await this.settingModel.aggregate([
      {
        $match: { _id: new ObjectId(id) }
      }
    ]);
    if (!dataById) throw new HttpException(StatusCodes.CONFLICT, i18n.t("api.commons.exist"));

    return dataById;
  }

  public async create(entity: SettingEntity): Promise<void> {
    if (isEmpty(entity)) throw new HttpException(StatusCodes.BAD_REQUEST, i18n.t("api.commons.validation"));

    const createData: ISetting = await this.settingModel.create({ ...entity });
    if (!createData) throw new HttpException(StatusCodes.CONFLICT, i18n.t("api.commons.reject"));


  }

  public async update(id: string, entity: SettingEntity): Promise<void> {
    if (isEmpty(entity)) throw new HttpException(StatusCodes.BAD_REQUEST, i18n.t("api.commons.reject"));


    await this.settingModel.updateOne({ _id: id }, entity, { new: true });

  }

  public async delete(id: string): Promise<void> {
    if (isEmpty(id)) throw new HttpException(StatusCodes.BAD_REQUEST, i18n.t("api.commons.reject"));

    await this.settingModel.deleteOne({ _id: id });


  }
}
