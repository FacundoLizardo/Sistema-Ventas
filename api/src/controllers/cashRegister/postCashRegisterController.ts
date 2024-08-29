/* import { Request } from "express";
import { CashRegister } from "../../db";
import { User } from "../../db";
import { controllerError } from "../../utils/controllerError";

export const postCashRegisterController = async ({ req }: { req: Request }) => {
  const {
    userId,
    initialAmount,
    finalAmount,
    income,
    egress,
    totalCashRegister,
    comments,
  } = req.body;

  if (!userId) {
    throw new Error("User id must be provided");
  }

  if (!initialAmount) {
    throw new Error("Initial amount must be provided");
  }

  try {
    const lastCashRegister = await CashRegister.findOne({
      order: [["createdAt", "DESC"]],
    });
 
    if (lastCashRegister && lastCashRegister.finalAmount === null) {
      throw new Error(
        "Final Amount in the last Cash Register instance cannot be null"
      );
    } 

    const userInstance = await User.findByPk(userId);
    if (!userInstance) {
      throw new Error("User with the provided userId does not exist");
    }

    await CashRegister.build({
      userId,
      initialAmount,
      finalAmount,
      income,
      egress,
      totalCashRegister,
      comments,
    }).validate();

    const newCashRegister = await CashRegister.create({
      userId: userId,
      initialAmount: initialAmount,
      finalAmount: finalAmount,
      income: income,
      egress: egress,
      totalCashRegister: totalCashRegister,
      comments: comments,
    });

    return newCashRegister;
  } catch (error) {
    controllerError(error);
  }
};
 */
// ----------------------- TEST -----------------------

/* 
	{
		"initialAmount": 120.00,
		"userId": "e4593977-67f1-4211-8279-b59b2eb05c13"
	} 
*/
