import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { default as i18n } from "i18next";

import { PaginateSearch } from "../../shared/libraries/paginateSearch";
import { IGroup, IGroupPagination } from "../interfaces/group.interface";
import GroupService from "../services/group.service";
import { GroupEntity } from "../entities/group.entity";
import { validateOrReject } from "class-validator";
import { warpValidationError } from "@/core/utils/validator.checker";
import { GroupValidation } from "@/modules/auth/validations/group.validation";


export const GroupResolver = {


  async groups({ paginate, search }, req: Request): Promise<void | Object> {


    const groupService = new GroupService();
    const paginateSearch = new PaginateSearch(paginate, search, false);

    const result: IGroupPagination = await groupService.index(paginateSearch);

    return {
      data: result.data.map(p => {

        return {
          ...p
        };
      }),
      pager: result.pagination
    };
  },

  async group({ id }, req: Request): Promise<void | Object> {


    const groupService = new GroupService();
    const findOneData: IGroup[] = await groupService.show(id);


    return {
      ...findOneData[0]
    };

  },

  async groupCreate({ inputs }, req: Request): Promise<void | Object> {

    const groupValidation = new GroupValidation();
    try {
      await validateOrReject(groupValidation);

    } catch (e) {
      warpValidationError(e);
    }

    const groupEntity = new GroupEntity(inputs);
    const groupService = new GroupService();
    await groupService.create(groupEntity);


  },

  async groupUpdate({ id, inputs }, req: Request): Promise<void | Object> {

    const groupValidation = new GroupValidation();
    try {
      await validateOrReject(groupValidation);

    } catch (e) {
      warpValidationError(e);
    }

    const groupEntity = new GroupEntity(req.body);
    const groupService = new GroupService();
    await groupService.update(id, groupEntity);


  },

  async groupDelete({ id }, req: Request): Promise<void | Object> {


    const groupService = new GroupService();
    await groupService.delete(id);


  }

};

