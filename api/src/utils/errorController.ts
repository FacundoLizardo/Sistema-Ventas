interface CustomError extends Error {
  message: string;
  code?: number;
}

export function errorController(error: unknown): never {
  const customError = error as CustomError;
  throw new Error(
    customError.message || "An error occurred while processing the request."
  );
}
