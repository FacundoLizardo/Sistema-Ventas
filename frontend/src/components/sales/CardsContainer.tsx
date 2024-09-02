import { ProductInterface } from "@/types";
import SaleCard from "./SaleCard";

interface  CardsContainerProps {
  data:  ProductInterface[]
}

export const CardsContainer = ({data}:CardsContainerProps) => {
  return (
    <div className="flex flex-col justify-items-center bg-card rounded-md py-2">
      {data.map((item) => {
        return <SaleCard key={item.id} />;
      })}
    </div>
  );
};
