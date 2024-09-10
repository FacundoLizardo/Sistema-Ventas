import { Operation } from "../db";
import {
  OperationCreationInterface,
  OperationInterface,
} from "../models/operations";
import { serviceError } from "../utils/serviceError";

class OperationServices {
  async getOperation(id: string) {
    try {
      const operation = await Operation.findByPk(id);
      if (!operation) {
        throw new Error(`The operation with id: ${id} does not exist`);
      }
      return operation.get({ plain: true }) as OperationInterface;
    } catch (error) {
      serviceError(error);
    }
  }

  async getOperations() {
    try {
      const operations = await Operation.findAll();
      return operations.map((operation) => operation.get({ plain: true }));
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
          companyId
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
