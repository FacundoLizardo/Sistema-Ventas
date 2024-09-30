interface CustomError extends Error {
  message: string;
  code?: number;
  stack?: string;
}

export function serviceError(error: unknown): never {
  const customError = error as CustomError;
  const errorMessage = customError.message
    ? `Controller Error: ${customError.message}`
    : "Controller Error: An error occurred while processing the request.";

  console.error("Error details:", {
    message: customError.message,
    code: customError.code,
    stack: customError.stack,
  });

  throw new Error(errorMessage);
}
