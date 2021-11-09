import multer from "multer";
import { sharedConfig } from "@/modules/shared/configs/shared.config";
import { multerFileFilter, multerFunctions } from "@/modules/shared/utils/multer.functions";
import { RequestWithUser } from "@/modules/auth/interfaces/reqeust.with.user.interface";
import { deleteFile } from "@/modules/shared/utils/delete.file";
import express, { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import authMiddleware from "@/modules/auth/middlewares/auth.middleware";
import { commonConfig } from "@/modules/common/configs/common.config";
import { default as i18n } from "i18next";
import { IMulterFile } from "@/modules/shared/interfaces/multer.file.interface";

const profileUploadRoute = express.Router();
const storage = multer.diskStorage({
  destination: sharedConfig.appRoot + commonConfig.profileDirectory,
  filename: multerFunctions
});
const maxSize = 4 * 1000 * 1000;
const upload = multer({ storage: storage, fileFilter: multerFileFilter, limits: { fileSize: maxSize } });

profileUploadRoute.post("/upload-profile", upload.single("image"), (req: RequestWithUser, res: Response, next: NextFunction) => {
  const uploaded: IMulterFile = req.file;

  if (!req.file) {
    return res.status(StatusCodes.NOT_ACCEPTABLE).json({ error: i18n.t("there is no file") });
  }

  return res
    .status(StatusCodes.OK)
    .json({
      path: commonConfig.profileDirectory + uploaded.filename
    });

});

export default profileUploadRoute;


