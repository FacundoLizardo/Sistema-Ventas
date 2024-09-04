import { ProductInterface } from "@/types";

interface StockItemProps {
    product: ProductInterface
}

export const StockItem = ({ product }: StockItemProps) => {
  return (
    <div className="flex items-center justify-between p-2">
      <span className="text-lg">{product.name}</span>
      <span className="text-lg">{product.stock}</span>
    </div>
  );
};
