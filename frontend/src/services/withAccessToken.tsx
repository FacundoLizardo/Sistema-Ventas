import { cookies } from "next/headers";

type ServiceFunction<T> = (token?: string, ...args: any[]) => Promise<T>;

export function withAccessToken<T>(
  serviceFunction: ServiceFunction<T>
): ServiceFunction<T> {
  return async (...args: any[]) => {
    const cookiesInstance = cookies();
    const token = cookiesInstance.get("token")?.value;
    return serviceFunction(token, ...args);
  };
}
