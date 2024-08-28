import { Branch } from "../../db";
import { BranchInterface } from "../../models/branch";
import { controllerError } from "../../utils/controllerError";

export const getAllBranchesController = async (): Promise<
  BranchInterface[]
> => {
  try {
    const branches = await Branch.findAll();
    return branches.map(
      (branch) => branch.get({ plain: true }) as BranchInterface
    );
  } catch (error: any) {
    controllerError(error);
  }
};
