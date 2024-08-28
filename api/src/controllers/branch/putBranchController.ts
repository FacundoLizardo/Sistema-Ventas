import { Request, Response } from "express";
import { Branch } from "../../db"; // Asegúrate de que esta importación sea correcta
import { BranchInterface } from "../../models/branch";
import { controllerError } from "../../utils/controllerError";

export const putBranchController = async (req: Request, _res: Response) => {
  const {
    id,
    ptoVta,
    afipId,
    name,
    location,
    isStorage,
    enable,
    manager,
    hours,
    phoneNumber,
  } = req.body as BranchInterface;

  try {
    const existingBranch = await Branch.findByPk(id);

    if (!existingBranch) {
      return `The branch with the id: ${id} does not exist`;
    }

    const [updated] = await Branch.update(
      {
        ptoVta,
        afipId,
        name,
        location,
        isStorage,
        enable,
        manager,
        hours,
        phoneNumber,
      },
      {
        where: { id },
      }
    );

    if (updated) {
      const updatedBranch = await Branch.findByPk(id);
      return updatedBranch;
    } else {
      return "Branch update failed";
    }
  } catch (error: any) {
    controllerError(error)
  }
};
