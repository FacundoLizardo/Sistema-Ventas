import { loginService } from "./loginService";

class AuthServices {
  async login(email: string, password: string) {
    return await loginService(email, password);
  }
}

export default new AuthServices();