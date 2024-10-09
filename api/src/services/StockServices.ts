import { serviceError } from "../utils/serviceError";
import { StockCreationInterface, StockInterface } from "../models/stock";
import { Stock } from "../db";
import { WhereOptions } from "sequelize";

class StockServices {
  async getStock({ id, branchId }: { id?: string; branchId?: string }) {
    try {
      const whereCondition: WhereOptions = { branchId };

      if (id) {
        whereCondition.id = id;
      }

      const stock = await Stock.findOne({
        where: whereCondition,
      });
      return stock;
    } catch (error) {
      serviceError(error);
    }
  }

  async getStocks(companyId: string) {
    try {
      const stocks = await Stock.findAll({ where: { companyId } });
      return stocks
        ? stocks.map((userObj) => userObj.get({ plain: true }))
        : [];
    } catch (error) {
      serviceError(error);
    }
  }

  async postStock(
    data: StockCreationInterface,
    companyId?: string
  ): Promise<StockInterface | string> {
    try {
      const [stock, created] = await Stock.findOrCreate({
        where: { branchId: data.branchId, productId: data.productId },
        defaults: {
          ...data,
          companyId,
        },
      });

      if (created) {
        return stock.get({ plain: true }) as StockInterface;
      } else {
        return "Stock not created because it already exists or something went wrong, please try again.";
      }
    } catch (error) {
      serviceError(error);
    }
  }

  async putStock(
    id: string,
    data: StockCreationInterface
  ): Promise<boolean | string> {
    try {
      const existingStock = await Stock.findOne({ where: { id } });

      if (!existingStock) {
        return `The user with id: ${id} does not exist`;
      }

      await existingStock.update(data);
      return true;
    } catch (error) {
      serviceError(error);
    }
  }

  /* async deleteUser(id: string): Promise<boolean> {
    try {
      const deletedCount = await User.destroy({ where: { id } });

      if (deletedCount === 0) {
        throw new Error("User not found");
      }

      return true;
    } catch (error) {
      serviceError(error);
    }
  } */
}

export default new StockServices();
