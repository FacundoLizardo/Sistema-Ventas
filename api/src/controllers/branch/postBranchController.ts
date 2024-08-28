import { Branch } from "../../db";
import { Request, Response } from "express";
import { BranchInterface } from "../../models/branch";
import { controllerError } from "../../utils/controllerError";

export const postBranchController = async (req: Request, _res: Response) => {
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

  try {
    const [branch, created] = await Branch.findOrCreate({
      where: { afipId },
      defaults: {
        ptoVta,
        name,
        location,
        isStorage,
        enable,
        manager,
        hours,
        phoneNumber,
      },
    });

    return created
      ? branch.dataValues
      : "Branch not created because it already exists or something is wrong, please try again";
  } catch (error: any) {
    controllerError(error);
  }
};
