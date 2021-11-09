import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { default as i18n } from "i18next";
import SettingService from "../services/setting.service";
import { ISetting, ISettingPagination } from "../interfaces/setting.interface";
import { SettingEntity } from "../entities/setting.entity";
import { PaginateSearch } from "../../shared/libraries/paginateSearch";
import { validateOrReject } from "class-validator";
import { warpValidationError } from "@/core/utils/validator.checker";
import { SettingValidation } from "@/modules/common/validations/setting.validation";


export const SettingResolver = {


  async settings({ paginate, search }, req: Request): Promise<void | Object> {


    const settingService = new SettingService();
    const paginateSearch = new PaginateSearch(paginate, search, false);


    const result: ISettingPagination = await settingService.index(paginateSearch);


    return {
      data: result.data.map(p => {

        return {
          ...p
        };
      }),
      pager: result.pagination
    };

  },

  async setting({ id }, req: Request): Promise<void | Object> {


    const settingService = new SettingService();
    const findOneData: ISetting[] = await settingService.show(id);


    return {
      ...findOneData[0]
    };

  },

  async settingCreate({ inputs }, req: Request): Promise<void | Object> {

    const settingValidation = new SettingValidation(inputs);

    try {
      await validateOrReject(settingValidation);

    } catch (e) {
      warpValidationError(e);
    }
    const settingEntity = new SettingEntity(inputs);
    settingEntity.createNow();
    const settingService = new SettingService();
    await settingService.create(settingEntity);


  },

  async settingUpdate({ id, inputs }, req: Request): Promise<void | Object> {


    const settingValidation = new SettingValidation(inputs);
    try {
      await validateOrReject(settingValidation);
    } catch (e) {
      warpValidationError(e);
    }

    const settingEntity = new SettingEntity(inputs);
    settingEntity.updateNow();
    const settingService = new SettingService();
    await settingService.update(id, settingEntity);


  },

  async settingDelete({ id }, req: Request): Promise<void | Object> {


    const settingService = new SettingService();
    await settingService.delete(id);


  }

};

