import { CashRegister } from "../db";
import {
  CashRegisterInterface,
  CashRegisterCreationInterface,
} from "../models/cashRegister";
import { serviceError } from "../utils/serviceError";

class CashRegisterServices {
  async getCashRegister(id: string): Promise<CashRegisterInterface | null> {
    try {
      const cashRegister = await CashRegister.findByPk(id);
      return cashRegister
        ? (cashRegister.get({ plain: true }) as CashRegisterInterface)
        : null;
    } catch (error) {
      serviceError(error);
    }
  }

  async getCashRegisters(): Promise<CashRegisterInterface[]> {
    try {
      const cashRegisters = await CashRegister.findAll();
      return cashRegisters
        ? cashRegisters.map((cashRegisterObj) =>
            cashRegisterObj.get({ plain: true })
          )
        : [];
    } catch (error) {
      serviceError(error);
    }
  }

  async postCashRegister(
    data: CashRegisterCreationInterface
  ): Promise<CashRegisterInterface | string> {
    const {
      userId,
      initialAmount,
      finalAmount,
      income,
      egress,
      totalCashRegister,
      comments,
    } = data;

    if (!userId) {
      return "User id must be provided";
    }

    if (!initialAmount) {
      return "Initial amount must be provided";
    }

    try {
/*       const lastCashRegister = await CashRegister.findOne({
        order: [["createdAt", "DESC"]],
      }); */
      

      const newCashRegister = await CashRegister.create({
        userId,
        initialAmount,
        finalAmount,
        income,
        egress,
        totalCashRegister,
        comments,
      });

      return newCashRegister.get({ plain: true }) as CashRegisterInterface;
    } catch (error) {
      serviceError(error);
    }
  }

  async putCashRegister(
    id: string,
    data: CashRegisterCreationInterface
  ): Promise<boolean | string> {
    const {
      userId,
      initialAmount,
      finalAmount,
      income,
      egress,
      totalCashRegister,
      comments,
    } = data;

    try {
      const existingCashRegister = await CashRegister.findOne({
        where: { id },
      });

      if (!existingCashRegister) {
        return `The cash register with id ${id} does not exist`;
      }

      await existingCashRegister.update({
        userId,
        initialAmount,
        finalAmount,
        income,
        egress,
        totalCashRegister,
        comments,
      });

      return true;
    } catch (error) {
      serviceError(error);
    }
  }

  async deleteCashRegister(id: string): Promise<boolean> {
    try {
      const deletedCount = await CashRegister.destroy({ where: { id } });

      if (deletedCount === 0) {
        throw new Error("Cash register not found");
      }

      return true;
    } catch (error) {
      serviceError(error);
    }
  }
}

export default new CashRegisterServices();
