import { Branch } from "../../db";
import { controllerError } from "../../utils/controllerError";

export const getAllBranchesController = async () => {
  try {
    const branches = await Branch.findAll();
    return branches || [];
  } catch (error) {
    controllerError(error);
  }
};
