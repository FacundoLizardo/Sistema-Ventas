"use client";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useSales } from "@/context/salesContext";
import { Input } from "../ui/input";

export default function SalesInfo() {
  const { products, discount, getTotalPrice, setDiscount } = useSales();

  const finalPrice = getTotalPrice();
  const discountedPrice = finalPrice * (1 - discount / 100);

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setDiscount(value);
    }
  };

  return (
    <Card className="w-full grid md:grid-cols-2">
      <CardHeader>
        <CardTitle>Información de Descuento y Facturación</CardTitle>
        <CardDescription>
          Aquí puedes gestionar el descuento aplicado a la compra. Introduce el
          porcentaje de descuento en el campo de entrada y el sistema calculará
          automáticamente el total a pagar después de aplicar el descuento.
        </CardDescription>
        <div className="flex gap-4 items-center">
          <span className="font-semibold">Aplicar descuento</span>
          <Input
            type="number"
            min="0"
            max="100"
            step="1"
            value={discount}
            onChange={handleDiscountChange}
            className="w-24"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between">
            <span className="font-semibold">Cantidad de Productos</span>
            <span>{products.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Precio Total</span>
            <span>$ {finalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Descuento</span>
            <span>% {discount}</span>
          </div>
          <div className="flex justify-between border-t py-4 font-bold md:text-xl">
            <span className="text-primary">Total a pagar</span>
            <Badge variant="default" className="md:text-lg">
              $ {discountedPrice.toFixed(2)}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
