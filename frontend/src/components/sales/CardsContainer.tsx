import { IProduct } from "@/services/products/ProductsServices";
import SaleCard from "./SaleCard";

export const CardsContainer = ({
  products,
}: {
  products: IProduct[];
}) => {
  return (
    <div className="flex flex-col justify-items-center bg-card rounded-md py-2">
      {products.length > 0 ? (
        products.map((product) => (
          <SaleCard key={product.id} product={product} />
        ))
      ) : (
        <p>No hay productos disponibles</p>
      )}
    </div>
  );
};
