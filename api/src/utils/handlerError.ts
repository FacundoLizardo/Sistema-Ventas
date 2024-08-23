import { Response } from "express";

export const handlerError = (
  res: Response,
  error: unknown,
  statusCode: number = 400
) => {
  const errorMessage =
    error instanceof Error
      ? error.message
      : "An unknown error has occurred.";

  res.status(statusCode).json({
    success: false,
    message: errorMessage,
  });
};
