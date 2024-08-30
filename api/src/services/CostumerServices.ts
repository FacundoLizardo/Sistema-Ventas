import { Costumer } from "../db";
import {
  CostumerCreationInterface,
  CostumerInterface,
} from "../models/costumers";
import { serviceError } from "../utils/serviceError";

class CostumerService {
  async getCostumer(dni: string): Promise<CostumerInterface | null> {
    try {
      const costumer = await Costumer.findByPk(dni);
      return costumer
        ? (costumer.get({ plain: true }) as CostumerInterface)
        : null;
    } catch (error) {
      serviceError(error);
    }
  }

  async getCostumers(): Promise<CostumerInterface[]> {
    try {
      const costumers = await Costumer.findAll();
      return costumers
        ? costumers.map((costumerObj) => costumerObj.get({ plain: true }))
        : [];
    } catch (error) {
      serviceError(error);
    }
  }

  async postCostumer(
    data: CostumerCreationInterface
  ): Promise<CostumerInterface | string> {
    try {
      const [costumer, created] = await Costumer.findOrCreate({
        where: { dni: data.dni },
        defaults: data,
      });

      if (created) {
        return costumer.get({ plain: true }) as CostumerInterface;
      } else {
        return "Costumer not created because it already exists or something is wrong, please try again";
      }
    } catch (error) {
      serviceError(error);
    }
  }

  async putCostumer(
    dni: string,
    data: CostumerCreationInterface
  ): Promise<boolean | string> {
    try {
      const existingCostumer = await Costumer.findOne({ where: { dni } });

      if (!existingCostumer) {
        return `The costumer with dni: ${dni} does not exist`;
      }

      await existingCostumer.update(data);
      return true;
    } catch (error) {
      serviceError(error);
    }
  }

  async deleteCostumer(dni: string): Promise<boolean> {
    try {
      const deletedCount = await Costumer.destroy({ where: { dni } });

      if (deletedCount === 0) {
        throw new Error("Costumer not found");
      }

      return true;
    } catch (error) {
      serviceError(error);
    }
  }
}

export default new CostumerService();

//---------- TESTS ----------

/* 
    {
        "dni": "123456789",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com",
        "address": "123 Main Street",
        "phoneNumber": "555-1234",
        "dateOfBirth": "1990-01-01",
        "enableDebt": false
    } 
*/
