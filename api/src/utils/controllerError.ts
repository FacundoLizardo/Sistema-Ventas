interface CustomError extends Error {
  message: string;
  code?: number;
}

export function controllerError(error: unknown): never {
  const customError = error as CustomError;
  throw new Error(
    customError.message
      ? `Controller Error: ${customError.message}`
      : "Controller Error: An error occurred while processing the request."
  );
}
