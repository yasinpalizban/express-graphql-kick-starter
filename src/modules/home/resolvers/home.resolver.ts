import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { default as i18n } from "i18next";


export const HomeResolver= {
  async index({ paginate, search }, req: Request): Promise<void | Object> {


      return {
        "statusMessage": i18n.t("api.commons.receive"),
        "data": " there is no data just empty  home page"
      };

  }
};

