import { Branch, User } from "../db";
import { serviceError } from "../utils/serviceError";
import { hashPassword } from "../utils/hashPassword";
import { UserCreationInterface, UserInterface } from "../models/user";

class UserServices {
  async getUser(id: string): Promise<UserInterface | null> {
    try {
      const user = await User.findByPk(id, {
        include: [{ model: Branch, as: "branch" }],
      });

      if (!user) {
        console.warn(`User not found with ID: ${id}`);
      }

      return user ? user.get({ plain: true }) : null;
    } catch (error) {
      serviceError(error);
      return null; // Retorna null en caso de error
    }
  }

  async getUsers(companyId: string) {
    try {
      const users = await User.findAll({ where: { companyId } });
      return users ? users.map((userObj) => userObj.get({ plain: true })) : [];
    } catch (error) {
      serviceError(error);
    }
  }

  async postUser(
    data: UserCreationInterface,
    companyId?: string
  ): Promise<UserInterface | string> {
    try {
      const password = await hashPassword(data.password);

      const [user, created] = await User.findOrCreate({
        where: { email: data.email },
        defaults: {
          ...data,
          password,
          companyId,
        },
      });

      if (created) {
        return user.get({ plain: true }) as UserInterface;
      } else {
        return "User not created because it already exists or something went wrong, please try again";
      }
    } catch (error) {
      serviceError(error);
    }
  }

  async putUser(id: string, data: UserCreationInterface) {
    try {
      const existingUser = await User.findOne({ where: { id } });

      if (!existingUser) {
        throw new Error(`The user with id: ${id} does not exist`);
      }

      if (data.password) {
        data.password = await hashPassword(data.password);
      }

      const newUser = await existingUser.update(data);
      return newUser;
    } catch (error) {
      serviceError(error);
    }
  }

  async deleteUser(id: string): Promise<boolean> {
    try {
      const deletedCount = await User.destroy({ where: { id } });

      if (deletedCount === 0) {
        throw new Error("User not found");
      }

      return true;
    } catch (error) {
      serviceError(error);
    }
  }
}

export default new UserServices();

//---------- TESTS ----------
/* 
    {
      "firstName": "Lucas",
      "lastName": "Tamburlini",
      "email": "ltamburlini@gmail.com",
      "password": "lucas1234",
      "address": "123 Main St",
      "phoneNumber": "123-456-7890",
      "cuit": "20-12345678-9",
      "enabled": true,
      "role": "SUPER_ADMIN"
    }

    {
      "firstName": "Test",
      "lastName": "User",
      "email": "testuser@example.com",
      "password": "testpassword",
      "address": "789 Oak St",
      "phoneNumber": "555-123-4567",
      "cuit": "20-11223344-5",
      "enabled": true,
      "role": "OWNER"
    }

*/
