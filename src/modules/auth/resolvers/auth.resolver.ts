import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { default as i18n } from "i18next";
import { RequestWithUser } from "../interfaces/reqeust.with.user.interface";
import { IUser } from "../interfaces/user.interface";
import AuthService from "../services/auth.service";
import { AuthEntity } from "../entities/auth.entity";
import { AuthControllerInterface } from "../interfaces/auth.controller.interface";
import { ILogIn } from "../interfaces/Log.in.interface";
import requestIp from "request-ip";
import { authConfig } from "@/modules/auth/configs/auth.config";
import { HttpException } from "@/core/exceptions/HttpException";
import { validateOrReject, validateSync } from "class-validator";
import { ProfileValidation } from "@/modules/common/validations/profile.validation";
import { warpValidationError } from "@/core/utils/validator.checker";
import { AuthSignupValidation } from "@/modules/auth/validations/auth.signup.validation";
import { AuthSigninValidation } from "@/modules/auth/validations/auth.signin.validation";
import { AuthActivateTokenEmailValidation } from "@/modules/auth/validations/auth.activate.token.email.validation";
import { AuthSendActivateEmailValidation } from "@/modules/auth/validations/auth.send.activate.email.validation";
import { AuthActivateTokenPhoneValidation } from "@/modules/auth/validations/auth.activate.token.phone.validation";
import { AuthSendActivatePhoneValidation } from "@/modules/auth/validations/auth.send.activate.phone.validation";
import { AuthForgotValidation } from "@/modules/auth/validations/auth.forgot.validation";
import { AuthResetPasswordEmailValidation } from "@/modules/auth/validations/auth.reset.password.email.validation";
import { AuthResetPasswordPhoneValidation } from "@/modules/auth/validations/auth.reset.password.phone.validation";

export const AuthResolver = {

  signUp: async function({ inputs }, req: Request): Promise<void | object> {

    const authSignupValidation = new AuthSignupValidation(inputs);
    try {
      await validateOrReject(authSignupValidation);

    } catch (e) {
      warpValidationError(e);
    }

    const authEntity = new AuthEntity(inputs);
    await authEntity.signUpMode().createNow().generateActivateToken()
      .activateExpiration().generatePasswordHash();

    authEntity.action;
    const captchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${authConfig.captcha.secretKey}&response=${authEntity.token}&remoteip=${requestIp.getClientIp(req)}`;

    const captchaResponse = await fetch(captchaUrl);
    const data = await captchaResponse.json();

    // if (data.success == false) {

    // throw new HttpException(StatusCodes.UNAUTHORIZED, i18n.t("auth.youAreRobot"));

    //  }
    delete authEntity.token;
    delete authEntity.action;

    authEntity.userAgent = req.useragent.os;
    authEntity.ip = requestIp.getClientIp(req);

    const authService = new AuthService();
    const signUpUserData: IUser = await authService.signUp(authEntity);


    return {
      "statusMessage": i18n.t("auth.singUp"),
      data: signUpUserData
    };

  },


  signIn: async function({ inputs }, req): Promise<void | object> {

    const authSigninValidation = new AuthSigninValidation(inputs);
    try {
      await validateOrReject(authSigninValidation);

    } catch (e) {
      warpValidationError(e);
    }
    const authEntity = new AuthEntity(inputs);

    authEntity.logInMode();
    authEntity.userAgent = req.useragent.os;
    authEntity.ip = requestIp.getClientIp(req);

    const authService = new AuthService();
    const isLogIn: ILogIn = await authService.signIn(authEntity);

    return {
      statusMessage: i18n.t("auth.singIn"),
      permissions: isLogIn.permissions,
      permissionGroup: isLogIn.permissionGroup,
      permissionUser: isLogIn.permissionUser,
      userInformation: isLogIn.findUser,
      role: isLogIn.role,
      jwt: isLogIn.jwt
    };


  },
  signOut: async function(req: RequestWithUser): Promise<void | object> {

    const userData: IUser = req.user;
    const authService = new AuthService();
    await authService.signOut(userData);

    // res.setHeader("Set-Cookie", ["Authorization=; Max-age=0"]);
    // res.setHeader("Authorization", "");
    //
    return {
      "statusMessage": i18n.t("auth.singOut")
    };


  },

  activationViaEmail: async function({ inputs }, req: Request): Promise<void | object> {
    const authActivateTokenEmailValidation = new AuthActivateTokenEmailValidation(inputs);
    try {
      await validateOrReject(authActivateTokenEmailValidation);

    } catch (e) {
      warpValidationError(e);
    }
    const authEntity = new AuthEntity(inputs);
    authEntity.activate();
    const authService = new AuthService();
    await authService.activationViaEmail(authEntity);

    return {
      "statusMessage": i18n.t("auth.accountActivate")
    };

  },
  sendActivateCodeViaEmail: async function({ inputs }, req: Request): Promise<void | object> {
    const authSendActivateEmailValidation = new AuthSendActivateEmailValidation(inputs);
    try {
      await validateOrReject(authSendActivateEmailValidation);

    } catch (e) {
      warpValidationError(e);
    }
    const authEntity = new AuthEntity(inputs);
    authEntity.generateActivateToken().activateExpiration().deActivate();
    const authService = new AuthService();
    await authService.sendActivateCodeViaEmail(authEntity);

    return {
      "statusMessage": i18n.t("auth.emailActivationSend")
    };

  },
  activationViaSms: async function({ inputs }, req: Request): Promise<void | object> {
    const activateTokenPhoneValidation = new AuthActivateTokenPhoneValidation(inputs);
    try {
      await validateOrReject(activateTokenPhoneValidation);

    } catch (e) {
      warpValidationError(e);
    }

    const authEntity = new AuthEntity(inputs);
    authEntity.activate();
    const authService = new AuthService();
    await authService.activationViaSms(authEntity);
    return {
      "statusMessage": i18n.t("auth.accountActivate")
    };

  },
  sendActivateCodeViaSms: async function({ inputs }, req: Request): Promise<void | object> {
    const authSendActivatePhoneValidation = new AuthSendActivatePhoneValidation(inputs);
    try {
      await validateOrReject(authSendActivatePhoneValidation);

    } catch (e) {
      warpValidationError(e);
    }
    const authEntity = new AuthEntity(inputs);
    authEntity.activateExpiration().generateActivateToken();
    const authService = new AuthService();
    await authService.sendActivateCodeViaSms(authEntity);

    return {
      "statusMessage": i18n.t("auth.smsActivationSend")
    };

  }
  , forgot: async function({ inputs }, req: Request): Promise<void | object> {
    const authSignupValidation = new AuthForgotValidation(inputs);
    try {
      await validateOrReject(authSignupValidation);

    } catch (e) {
      warpValidationError(e);
    }
    const authEntity = new AuthEntity(inputs);
    authEntity.logInMode().resetNow().resetExpiration().generateRestToken();
    const authService = new AuthService();
    authEntity.action;

    const captchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${authConfig.captcha.secretKey}&response=${authEntity.token}&remoteip=${requestIp.getClientIp(req)}`;

    const captchaResponse = await fetch(captchaUrl);
    const data = await captchaResponse.json();

    if (data.success == false) {
      // throw new HttpException(StatusCodes.UNAUTHORIZED, i18n.t("auth.youAreRobot"));

    }
    delete authEntity.token;
    delete authEntity.action;
    authEntity.userAgent = req.useragent.os;
    authEntity.ip = requestIp.getClientIp(req);
    await authService.forgot(authEntity);


    return {
      "statusMessage": i18n.t("auth.forgotDone")
    };

  },
  resetPasswordViaEmail: async function({ inputs }, req: Request): Promise<void | object> {
    const authResetPasswordEmailValidation = new AuthResetPasswordEmailValidation(inputs);
    try {
      await validateOrReject(authResetPasswordEmailValidation);

    } catch (e) {
      warpValidationError(e);
    }
    const authEntity = new AuthEntity(inputs);
    await authEntity.resetNow().generatePasswordHash();
    const authService = new AuthService();
    await authService.resetPasswordViaEmail(authEntity);
    return {
      "statusMessage": i18n.t("auth.resetPasswordDone")
    };

  },
  resetPasswordViaSms: async function({ inputs }, req: Request): Promise<void | object> {
    const authSignupValidation = new AuthResetPasswordPhoneValidation(inputs);
    try {
      await validateOrReject(authSignupValidation);

    } catch (e) {
      warpValidationError(e);
    }
    const authEntity = new AuthEntity(inputs);
    await authEntity.resetNow().generatePasswordHash();
    const authService = new AuthService();
    await authService.resetPasswordViaSms(authEntity);
    return {
      "statusMessage": i18n.t("auth.resetPasswordDone")
    };

  }


};

