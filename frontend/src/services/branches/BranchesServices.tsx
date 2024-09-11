import { accessToken } from "../accessToken";

export interface IBranch {
    id: string;
    ptoVta: number;
    afipId?: string;
    name: string;
    location: string;
    isStorage?: boolean;
    enable?: boolean;
    manager?: string[];
    hours?: string;
    phoneNumber?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }

export interface IBranchCreate extends Omit<IBranch, "id"> {}

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

  static async getAll(companyId: string) {
    try {
      const token = await this.getToken();
      console.log(token, companyId);
      
    } catch (error) {
      console.error("Error getting products:", error);
      throw error;
    }
  }
}

export default UsersServices;
