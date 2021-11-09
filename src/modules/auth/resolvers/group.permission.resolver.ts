import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { default as i18n } from "i18next";
import GroupPermissionService from "../services/group.permission.service";
import { IGroupPermission, IGroupPermissionPagination } from "../interfaces/group.permission.interface";
import { GroupPermissionEntity } from "../entities/group.permission.entity";
import { PaginateSearch } from "../../shared/libraries/paginateSearch";


export const GroupPermissionResolver = {


  async groupPermissions({ id, paginate, search }, req: Request): Promise<void | Object> {


    const groupPermissionService = new GroupPermissionService();
    const urlQueryParam = new PaginateSearch(paginate, search, true);
    const result: IGroupPermissionPagination = await groupPermissionService.setNestId(id).index(urlQueryParam);

  },

  async groupPermission({ id, subId }, req: Request): Promise<void | Object> {


    const groupPermissionService = new GroupPermissionService();
    const findOneData: IGroupPermission[] = await groupPermissionService.setNestId(id).show(subId);


  },

  async groupPermissionCreate({ id, inputs }, req: Request): Promise<void | Object> {


    const groupPermissionEntity = new GroupPermissionEntity(req.body);
    const groupPermissionService = new GroupPermissionService();
    await groupPermissionService.setNestId(id).create(groupPermissionEntity);

  },

  async groupPermissionUpdate({ id, subId, inputs }, req: Request): Promise<void | Object> {

    const groupPermissionEntity = new GroupPermissionEntity(req.body);
    const groupPermissionService = new GroupPermissionService();
    await groupPermissionService.setNestId(id).update(subId, groupPermissionEntity);


  },

  async groupPermissionDelete({ id, subId }, req: Request): Promise<void | Object> {


    const groupPermissionService = new GroupPermissionService();
    await groupPermissionService.setNestId(id).delete(subId);

  }

};
