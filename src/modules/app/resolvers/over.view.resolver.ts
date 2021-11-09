import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { default as i18n } from "i18next";
import { IUserPagination } from "../../auth/interfaces/user.interface";
import { PaginateSearch } from "../../shared/libraries/paginateSearch";
import UserService from "../../common/services/user.service";


export const OverViewResolver = {

  async overView({ paginate, search }, req: Request): Promise<void | Object> {


    const paginateSearch = new PaginateSearch(paginate, search, false);
    const userService = new UserService();
    const user: IUserPagination = await userService.index(paginateSearch);
    return {
      user: user.data.map(p => {

        return {
          ...p
        };
      })
    };

  }
};
