import { Response } from "express";

export const controllerError = (
  res: Response,
  error: unknown,
  statusCode: number = 500
) => {
  const errorMessage =
    error instanceof Error
      ? error.message
      : "An unknown error occurred.";

  res.status(statusCode).json({
    success: false,
    message: errorMessage,
  });
};