import { accessToken } from "../accessToken";
import { getUserService } from "./getUserService";
export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address?: string;
  phoneNumber?: string;
  cuit?: string;
  branches?: string[];
  enabled: boolean;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserCreate extends Omit<IUser, "id"> {}

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
}

export default UsersServices;
