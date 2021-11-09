import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { default as i18n } from "i18next";
import { RequestWithUser } from "../../auth/interfaces/reqeust.with.user.interface";
import ProfileService from "../services/profile.service";
import { UserEntity } from "../entities/user.entity";
import { IUser } from "../../auth/interfaces/user.interface";
import { isEmpty } from "./../../shared/utils/is.empty";
import { IMulterFile } from "./../../shared/interfaces/multer.file.interface";
import { optimizeImage } from "./../../shared/utils/optimize.image";
import { commonConfig } from "./../../common/configs/common.config";
import { IUserLogIn } from "@/modules/auth/interfaces/Log.in.interface";
import { ProfileValidation } from "@/modules/common/validations/profile.validation";
import { HttpException } from "@/core/exceptions/HttpException";
import { validateOrReject, Validator } from "class-validator";
import { warpValidationError } from "@/core/utils/validator.checker";
import { sharedConfig } from "@/modules/shared/configs/shared.config";
import * as path from "path";
import * as fs from "fs";

export const ProfileResolver = {

  profile: async function({ inputs }, req: RequestWithUser): Promise<void | any> {

    const user: IUserLogIn = req.user;

    const profileService = new ProfileService();
    const findOneData: IUser = await profileService.show(user._id);

    return {
      ...findOneData._doc
    };

  },


  profileUpdate: async function({ inputs }, req: RequestWithUser): Promise<void | Object> {

    const profileValidation = new ProfileValidation(inputs);

    try {
      await validateOrReject(profileValidation);

    } catch (e) {
      warpValidationError(e);
    }

    const user: IUserLogIn = req.user;
    const userEntity = new UserEntity(inputs);
    await userEntity.updateNow().generatePasswordHash();
    const profileService = new ProfileService();
    if (userEntity.image) {

      await optimizeImage(sharedConfig.appRoot + userEntity.image, 200, 200, 60);
    }
    const updateData: IUser = await profileService.update(user._id, userEntity);


  }

};
