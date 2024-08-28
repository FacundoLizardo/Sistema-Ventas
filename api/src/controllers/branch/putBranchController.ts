import { Branch } from "../../db";
import { Request } from "express";
import { BranchInterface } from "../../models/branch";
import { controllerError } from "../../utils/controllerError";

export const putBranchController = async ({ req }: { req: Request }) => {
  const {
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

  const { id } = req.params;

  try {
    const existingBranch = await Branch.findOne({
      where: { id: id },
    });

    if (!existingBranch) {
      throw new Error(`The branch whit the id:${id} does not exist`);
    }
    const updatedBranch = await Branch.update(
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
        where: { id: id },
      }
    );

    return updatedBranch;
  } catch (error) {
    controllerError(error);
  }
};
