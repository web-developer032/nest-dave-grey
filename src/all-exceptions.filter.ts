import {
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from "@nestjs/common";
import { Response, Request } from "express";
import { BaseExceptionFilter } from "@nestjs/core";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { MyLoggerService } from "./my-logger/my-logger.service";

type MyResponseObj = {
  statusCode: number;
  timeStamp: string;
  path: string;
  response: string;
};

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new MyLoggerService(AllExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const myResponseObj: MyResponseObj = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      timeStamp: new Date().toISOString(),
      path: request.url,
      response: "",
    };

    if (exception instanceof HttpException) {
      myResponseObj.statusCode = exception.getStatus();
      myResponseObj.response = exception.getResponse().toString();
    } else if (exception instanceof PrismaClientValidationError) {
      myResponseObj.statusCode = 422;
      myResponseObj.response = exception.message.replaceAll(/\n/g, "");
    } else {
      myResponseObj.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      myResponseObj.response = "Internal Server Error";
    }

    this.logger.error(myResponseObj.response, exception.stack);
    response.status(myResponseObj.statusCode).json(myResponseObj);

    super.catch(exception, host);
  }
}
