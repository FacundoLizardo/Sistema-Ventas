import { Branch } from "../../db";
import { BranchInterface } from "../../models/branch";
import { controllerError } from "../../utils/controllerError";

export const getBranchByIdController = async (
  id: string
): Promise<BranchInterface | string> => {
  try {
    const branch = await Branch.findByPk(id);
    if (!branch) {
      return "Branch does not exist";
    } else {
      const branchData: BranchInterface = branch.get({
        plain: true,
      }) as BranchInterface;
      return branchData;
    }
  } catch (error: any) {
    controllerError(error)
  }
};
