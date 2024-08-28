import { Request } from "express";

import { CashRegister } from "../../db";

export const putCashRegisterController = async ({ req }: { req: Request }) => {
  const {
    userId,
    initialAmount,
    finalAmount,
    income,
    egress,
    totalCashRegister,
    comments,
  } = req.body;

  const cashId = req.params.id;

  const existingCashRegister = await CashRegister.findOne({
    where: { id: cashId },
  });

  if (!existingCashRegister) {
    throw new Error(`The cash register with the id ${cashId} does not exist`);
  }

  const updatedCashRegister = await CashRegister.update(
    {
      userId,
      initialAmount,
      finalAmount,
      income,
      egress,
      totalCashRegister,
      comments,
    },
    {
      where: { cashId: cashId },
    }
  );

  if (updatedCashRegister) {
    return updatedCashRegister;
  } else {
    throw new Error(
      `Error while updating cash register: Cash register with id ${cashId} not updated`
    );
  }
};
