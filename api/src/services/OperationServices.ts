import { Operation } from "../db";
import {
  OperationCreationInterface,
  OperationInterface,
} from "../models/operations";
import { serviceError } from "../utils/serviceError";
import { Op, WhereOptions } from "sequelize";

class OperationServices {
  async getOperations({
    startDate,
    endDate,
    companyId,
    userId,
  }: {
    startDate: string;
    endDate?: string;
    companyId: string;
    userId?: string;
  }) {
    try {
      const whereCondition: WhereOptions = {
        companyId,
      };

      if (userId) {
        whereCondition.userId = userId;
      }

      const startDateUTC = new Date(new Date(startDate).toUTCString());

      const endDateUTC = endDate
        ? new Date(new Date(endDate).toUTCString())
        : new Date(startDateUTC);

      endDateUTC.setUTCHours(23, 59, 59, 999);

      whereCondition.createdAt = {
        [Op.between]: [startDateUTC, endDateUTC],
      };

      const operations = await Operation.findAll({
        where: whereCondition,
      });

      return operations.map((operation) =>
        operation.get({ plain: true })
      ) as OperationInterface[];
    } catch (error) {
      serviceError(error);
    }
  }

  async postOperation(
    data: OperationCreationInterface,
    companyId?: string
  ): Promise<OperationInterface | string> {
    try {
      const operation = await Operation.create({
        defaults: {
          ...data,
          companyId,
        },
      });

      if (operation) {
        return operation.get({ plain: true }) as OperationInterface;
      } else {
        return "Operation not created because it already exists or something went wrong, please try again";
      }
    } catch (error) {
      serviceError(error);
    }
  }

  async putOperation(
    id: string,
    data: OperationInterface
  ): Promise<boolean | string> {
    try {
      const existingOperation = await Operation.findOne({ where: { id } });

      if (!existingOperation) {
        return `The operation with id: ${id} does not exist`;
      }

      await existingOperation.update(data);
      return true;
    } catch (error) {
      serviceError(error);
    }
  }

  async deleteOperation(id: string): Promise<boolean> {
    try {
      const deletedCount = await Operation.destroy({ where: { id } });

      if (deletedCount === 0) {
        throw new Error(`Operation with id: ${id} not found`);
      }

      return true;
    } catch (error) {
      serviceError(error);
    }
  }
}

export default new OperationServices();
