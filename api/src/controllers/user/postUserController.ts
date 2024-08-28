import { UserInterface } from "../../models/users";
import { controllerError } from "../../utils/controllerError";
import { User } from "../../db";
import { hashPassword } from "../../utils/hashPassword";
import { Request } from "express";

export interface UserUpdateInterface extends UserInterface {
  userId: string;
}

export const postUserController = async ({ req }: { req: Request }) => {

  const {
    firstName,
    lastName,
    email,
    password: rawPassword,
    address,
    phoneNumber,
    cuit,
    branch,
    enabled,
    role,
  } = req.body as UserInterface;

  try {
    const password = await hashPassword(rawPassword);

    const [newUser, created] = await User.findOrCreate({
      where: { cuit: cuit },
      defaults: {
        firstName,
        lastName,
        email,
        password,
        address,
        phoneNumber,
        cuit,
        branch,
        enabled,
        role,
      },
    });

    return created
      ? newUser
      : "User not created because it already exists or something is wrong, please try again";
  } catch (error) {
    controllerError(error);
  }
};

//------------------modelo de usario para probar ruta --------------------//
// {
//     "firstName": "John",
//     "lastName": "Doe",
//     "email": "pepeelposho@example.com",
//     "password": "habiaunavezunavaca",
//     "address": "123 Main St",
//     "phoneNumber": "555-1234",
//     "cuit": "123456789",
//     "branch": ["e4bf1f1d-0a33-4c02-a4e4-4a97cd3405d2", "f4bf1f1d-0a33-4c02-a4e4-4a97cd3405d2"],
//     "enabled": true,
//     "role": "admin"
//   }
