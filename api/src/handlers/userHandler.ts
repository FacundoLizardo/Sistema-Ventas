/* import { Request, Response } from "express";
import { handlerError } from "../utils/controllerError";
import { createError } from "../utils/createError";
import { getUserByIdController } from "../controllers/user/getUserByIdController";
import { postUserController } from "../controllers/user/postUserController";
import { putUserController } from "../controllers/user/putUserController";
import { deleteUserController } from "../controllers/user/deleteUserController";
import { getAllUsersController } from "../controllers/user/getAllUsersController";

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await getUserByIdController(id);

    if (!user) {
      throw createError("User not found.", 404);
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    handlerError(res, error, 404);
  }
};

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await getAllUsersController();
    res.status(200).json({ success: true, users });
  } catch (error) {
    handlerError(res, error, 404);
  }
};

export const postUser = async (req: Request, res: Response) => {
  try {
    const newUser = await postUserController({ req });

    if (!newUser) {
      throw createError("Error creating user.", 400);
    }
    res.status(200).json(newUser);
  } catch (error) {
    handlerError(res, error, 400);
  }
};

export const putUser = async (req: Request, res: Response) => {
  try {
    const cuit = req.params.id;

    console.log({ cuit });

    const updateUser = await putUserController({ cuit, req });
    if (!updateUser) {
      throw createError(
        "User not updated something went wrong, please try again",
        400
      );
    }
    res.status(200).json(updateUser);
  } catch (error) {
    handlerError(res, error, 400);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const cuit = req.params.id;
    const deletedUser = await deleteUserController(cuit);
    res.status(200).json(deletedUser);
  } catch (error) {
    handlerError(res, error, 400);
  }
};
 */