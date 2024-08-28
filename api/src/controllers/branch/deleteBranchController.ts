import { Branch } from "../../db";
import { controllerError } from "../../utils/controllerError";

export const deleteBranchController = async (branchId: string) => {
  try {
    const existingBranch = await Branch.findOne({
      where: { id: branchId },
    });
    if (!existingBranch) {
      throw new Error(`The branch whit the id: ${branchId} does not exist`);
    }
    const deleteBranch = await Branch.destroy({
      where: { id: branchId },
    });
    return deleteBranch;
  } catch (error) {
    controllerError(error);
  }
};
