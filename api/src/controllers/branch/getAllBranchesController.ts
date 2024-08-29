/* import { Branch } from "../../db";
import { controllerError } from "../../utils/servicesError";

export const getAllBranchesController = async () => {
  try {
    const branches = await Branch.findAll();
    return branches || [];
  } catch (error) {
    controllerError(error);
  }
};
 */