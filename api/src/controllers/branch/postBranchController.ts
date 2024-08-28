import { Request } from "express";
import { controllerError } from "../../utils/controllerError";

import { Branch } from "../../db";
import { BranchInterface } from "../../models/branch";

export const postBranchController = async ({ req }: { req: Request }) => {
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
      where: { afipId: afipId },
      defaults: {
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
    });

    return created
      ? branch
      : "Branch not created because it already exists or something is wrong, please try again";
  } catch (error) {
    controllerError(error);
  }
};

//----------------- TESTS ----------------

/* 
{
    "afipId": "123456789",
    "name": "Sucursal Principal",
    "location": "Ciudad Principal",
    "isStorage": false,
    "enable": true,
    "manager": ["c1d74da3-634a-4d2d-a5a1-72e68d20f0d7", "e3b55df8-871c-4e0b-bf61-9f3a19fd0e99"],
    "hours": "9:00 AM - 6:00 PM",
    "phoneNumber": "+1234567890"
  }
 */
