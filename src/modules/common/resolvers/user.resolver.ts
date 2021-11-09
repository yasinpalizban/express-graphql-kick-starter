import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { default as i18n } from "i18next";

import { IUser, IUserPagination } from "../../auth/interfaces/user.interface";
import UserService from "../services/user.service";
import { UserEntity } from "../entities/user.entity";
import { PaginateSearch } from "../../shared/libraries/paginateSearch";
import { validateOrReject } from "class-validator";
import { warpValidationError } from "@/core/utils/validator.checker";
import { UsersPostValidation } from "@/modules/common/validations/users.post.validation";
import { UsersPutValidation } from "@/modules/common/validations/users.put.validation";

export const UserResolver = {


  async users({  paginate,search } , req: Request): Promise<void | Object> {


    const userService = new UserService();
    const paginateSearch = new PaginateSearch(paginate,search,  false);
    const result: IUserPagination = await userService.index(paginateSearch);

    return {
      data: result.data.map(p => {

        return {
          ...p
        };
      }),
      pager: result.pagination
    };

  },

  async user({ id }, req: Request): Promise<void | Object> {

    const userService = new UserService();
    const findOneData: IUser[] = await userService.show(id);

    return {
     ...findOneData[0]
    };
  },

  async userCreate({ inputs }, req: Request): Promise<void | Object> {
    const usersPostValidation = new UsersPostValidation(inputs);
    try {
      await validateOrReject(usersPostValidation);
    } catch (e) {
      warpValidationError(e);
    }
    const userEntity = new UserEntity(req.body);
    await userEntity.activate().createNow().generatePasswordHash();
    const userService = new UserService();
    await userService.create(userEntity);


  },

  async userUpdate({ id,inputs }, req: Request): Promise<void | Object> {
    const usersPutValidation = new UsersPutValidation(inputs);
    try {
      await validateOrReject(usersPutValidation);
    } catch (e) {
      warpValidationError(e);
    }

    const userEntity = new UserEntity(inputs);
    await userEntity.updateNow().generatePasswordHash();
    const userService = new UserService();
    await userService.update(id, userEntity);



  },

  async userDelete({ id }, req: Request): Promise<void | Object> {
    const userService = new UserService();
    await userService.delete(id);


  }

};

