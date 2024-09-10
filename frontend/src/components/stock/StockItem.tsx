import { ProductInterface } from "@/services/products/ProductsServices";

export const StockItem = ({ product }: { product: ProductInterface}) => {
  return (
    <div className="flex items-center justify-between p-2">
      <span className="text-lg">{product.name}</span>
      <span className="text-lg">{product.stock}</span>
    </div>
  );
};
