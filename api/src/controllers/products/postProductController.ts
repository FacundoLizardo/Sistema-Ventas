/* import { Product } from "../../db";
import { ProductInterface } from "../../models/product";
import { controllerError } from "../../utils/servicesError";
import { Request } from "express";

export interface ProductUpdateInterface extends ProductInterface {
  productId: string;
}

export const postProductController = async ({ req }: { req: Request }) => {
  const {
    name,
    category,
    cost,
    finalPrice,
    discount,
    profitPercentage,
    stock,
    allowNegativeStock,
    trackStock,
    minimumStock,
    enabled,
    notesDescription,
    taxes,
    barcode,
  } = req.body as ProductUpdateInterface;
  try {
    const [product, created] = await Product.findOrCreate({
      where: { name: name },
      defaults: {
        name,
        category,
        cost,
        finalPrice,
        discount,
        profitPercentage,
        stock,
        allowNegativeStock,
        trackStock,
        minimumStock,
        enabled,
        notesDescription,
        taxes,
        barcode,
      },
    });

    return created
      ? product
      : "Product not created because it already exists or something is wrong, please try again";
  } catch (error) {
    controllerError(error);
  }
}; */

/*--------------- Test route model -------------------*/
/* 
 {
     "category": "Electrónicos",
     "cost": 50.00,
     "finalPrice": 75.00,
     "discount": 10.00,
     "profitPercentage": 20,
     "stock": 100,
     "enabled": true,
     "notesDescription": "Descripción de prueba",
     "taxes": 5.00,
     "barcode": "123456789012"
   }
*/
