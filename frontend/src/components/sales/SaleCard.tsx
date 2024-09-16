import { Button } from "@/components/ui/button";
import { IProduct } from "@/services/products/ProductsServices";
import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";

export default function SaleCard({ product }: { product: IProduct }) {
  return (
    <div className="w-full bg-card rounded-md shadow-sm">
      <div className="flex items-center justify-between h-10 px-4">
        <div className="flex flex-row gap-3">
          <div className="text-card-foreground rounded-md bg-gray-500 px-3">
            {product.stock}
          </div>
          <div className="text-card-foreground font-medium">
            {product.name}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <MinusIcon className="h-4 w-4" />
          </Button>
          <div className="text-card-foreground">10</div>
          <Button variant="ghost" size="icon">
            <PlusIcon className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="icon">
            <Trash2Icon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
