import { Branch } from "../../db";
import { controllerError } from "../../utils/controllerError";

export const deleteBranchController = async (id: string) => {
  try {
    const deletedBranch = await Branch.destroy({
      where: { id },
    });

    if (deletedBranch === 0) {
      return `Branch ${id} does not exist`;
    }
    return deletedBranch;
  } catch (error) {
    controllerError(error)
  }
};
