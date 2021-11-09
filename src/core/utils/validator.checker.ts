import { ValidationError } from "class-validator";
import { StatusCodes } from "http-status-codes";
import { HttpException } from "@/core/exceptions/HttpException";

export function warpValidationError(errors: ValidationError[]) {
  const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(", ");
  throw  new HttpException(StatusCodes.NOT_ACCEPTABLE, message);

}
