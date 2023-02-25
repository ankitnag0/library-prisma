import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status'
import { ValidationError } from 'joi';

const errorHandlerMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ValidationError) {
    const errorMessages = error.details.map(detail => detail.message);
    const errorMessage = errorMessages.join(', ').replace(/\"/g, '\'');
    const response = {
      status: httpStatus.BAD_REQUEST,
      message: errorMessage,
    }
    res.status(httpStatus.BAD_REQUEST).json(response);
  } else {
    return res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      status: error.statusCode || httpStatus.INTERNAL_SERVER_ERROR,
      message: error.message || httpStatus['500_NAME'],
    });
  }

}

export default errorHandlerMiddleware;