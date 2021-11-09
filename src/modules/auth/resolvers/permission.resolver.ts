import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { default as i18n } from "i18next";
import PermissionService from "../services/permission.service";
import { IPermission, IPermissionPagination } from "../interfaces/permission.interface";
import { PermissionEntity } from "../entities/permission.entity";
import { PaginateSearch } from "../../shared/libraries/paginateSearch";
import { validateOrReject } from "class-validator";
import { warpValidationError } from "@/core/utils/validator.checker";
import { PermissionValidation } from "@/modules/auth/validations/permission.validation";
import { GroupValidation } from "@/modules/auth/validations/group.validation";

export const PermissionResolver = {


  async permissions({ paginate, search }, req: Request): Promise<void | Object> {


    const permissionService = new PermissionService();
      const paginateSearch = new PaginateSearch(paginate, search, false);

      const result: IPermissionPagination = await permissionService.index(paginateSearch);

    return {
      data: result.data.map(p => {

        return {
          ...p
        };
      }),
      pager: result.pagination
    };

  },

  async permission({ id }, req: Request): Promise<void | Object> {



      const permissionService = new PermissionService();
      const findOneData: IPermission[] = await permissionService.show(id);

    return {
      ...findOneData[0]
    };

  },

  async permissionCreate({ inputs }, req: Request): Promise<void | Object> {

    const groupValidation = new GroupValidation();
    try {
      await validateOrReject(groupValidation);

    } catch (e) {
      warpValidationError(e);
    }
    const permissionEntity = new PermissionEntity(req.body);
    permissionEntity.createNow();
    const permissionService = new PermissionService();

    await permissionService.create(permissionEntity);


  },

  async permissionUpdate({ id, inputs }, req: Request): Promise<void | Object> {
    const permissionValidation = new PermissionValidation();
    try {
      await validateOrReject(permissionValidation);

    } catch (e) {
      warpValidationError(e);
    }
    const permissionEntity = new PermissionEntity(req.body);
    permissionEntity.updateNow();
    const permissionService = new PermissionService();
    await permissionService.update(id, permissionEntity);


  },

  async permissionDelete({ id }, req: Request): Promise<void | Object> {


    const permissionService = new PermissionService();
    await permissionService.delete(id);


  }

};

