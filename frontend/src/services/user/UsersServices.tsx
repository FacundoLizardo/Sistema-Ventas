import { accessToken } from "../accessToken";
import { IBranch } from "../branches/BranchesServices";
import { getUserService } from "./getUserService";
import { putUserService } from "./putUserService";
export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address?: string;
  phoneNumber?: string;
  cuit?: string;
  enabled: boolean;
  role: string;
  branchId?: string;
  branch?: IBranch;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserCreate extends Omit<IUser, "id" | "password"> {}

class UsersServices {
  static async getToken() {
    try {
      const token = accessToken();
      return token;
    } catch (error) {
      console.error("Error with Token:", error);
      throw error;
    }
  }

  static async get(userId: string) {
    try {
      const token = await this.getToken();
      return await getUserService({ token, userId });
    } catch (error) {
      console.error("Error getting products:", error);
      throw error;
    }
  }

  static async put(userId: string, data: Partial<IUser>) {
    try {
      const token = await this.getToken();
      return await putUserService({ token, userId, data });
    } catch (error) {
      console.error("Error getting products:", error);
      throw error;
    }
  }
}

export default UsersServices;
