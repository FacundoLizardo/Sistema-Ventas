/* import { controllerError } from "../../utils/servicesError";
import { Branch } from "../../db";

export const getBranchByIdController = async (id: string) => {
  try {
    const branch = await Branch.findByPk(id);
    return branch;
  } catch (error) {
    controllerError(error);
  }
};
 */