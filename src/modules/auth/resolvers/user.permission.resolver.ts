import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { default as i18n } from "i18next";
import { IUserPermission, IUserPermissionPagination } from "../interfaces/user.permission.interface";
import UserPermissionService from "../services/user.permission.service";
import { UserPermissionEntity } from "@/modules/auth/entities/user.permission.entity";
import { PaginateSearch } from "../../shared/libraries/paginateSearch";

export const UserPermissionResolver = {


  async userPermissions({ id, paginate, search }, req: Request): Promise<void | Object> {


    const userPermissionService = new UserPermissionService();
    const urlQueryParam = new PaginateSearch(paginate, search, true);

    const result: IUserPermissionPagination = await userPermissionService.setNestId(id).index(urlQueryParam);


  },

  async groupPermission({ id, subId }, req: Request): Promise<void | Object> {


    const userPermissionService = new UserPermissionService();

    const findOneData: IUserPermission[] = await userPermissionService.setNestId(id).show(subId);


  },

  async userPermissionCreate({ id, inputs }, req: Request): Promise<void | Object> {


    const userPermissionEntity = new UserPermissionEntity(req.body);
    const userPermissionService = new UserPermissionService();
    await userPermissionService.setNestId(id).create(userPermissionEntity);


  },

  async userPermissionUpdate({ id, subId, inputs }, req: Request): Promise<void | Object> {


    const userPermissionEntity = new UserPermissionEntity(req.body);
    const userPermissionService = new UserPermissionService();
    await userPermissionService.setNestId(id).update(subId, userPermissionEntity);


  },

  async userPermissionDelete({ id, subId }, req: Request): Promise<void | Object> {


    const userPermissionService = new UserPermissionService();
    await userPermissionService.setNestId(id).delete(subId);


  }

};
