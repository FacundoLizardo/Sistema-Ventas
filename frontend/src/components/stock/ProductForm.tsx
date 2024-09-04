"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthServices from "@/services/auth/AuthServices";

const formSchema = z.object({
  email: z.string().email({ message: "Correo electrónico inválido" }),
  password: z
    .string()
    .min(6, { message: "El password debe tener al menos 6 caracteres." }),
});

export default function ProductForm({ locale }: { locale: string }) {
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    
    try {
      const response = await AuthServices.login(data.email, data.password);

      const companyId = response.dataUser.companyId;

      const newURL = `${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/${locale}/${companyId}/sales`;

      window.location.href = newURL;
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  const { isDirty, isValid, isSubmitting, isSubmitSuccessful } = form.formState;
  const submitDisabled = !isDirty || !isValid;
  const submitLoading = isSubmitting || isSubmitSuccessful;

  return (
    <Card>
      <Form {...form}>
        <form className="grid gap-4">
          <CardHeader>
            <CardTitle>Crear un nuevo producto</CardTitle>
            <CardDescription>
              Complete el formulario para crear un nuevo producto.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" placeholder="Enter product name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Categoria</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione una categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">
                    Bebidas sin alcohol
                  </SelectItem>
                  <SelectItem value="clothing">Bebidas alcoholicas</SelectItem>
                  <SelectItem value="home">Kiosco</SelectItem>
                  <SelectItem value="sports">Cigarrillos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="cost">Costo</Label>
                <Input id="cost" type="number" placeholder="Ingrese el costo" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="discount">Descuento</Label>
                <Input
                  id="discount"
                  type="number"
                  placeholder="Ingrese el descuento"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="final-price">Percio final</Label>
                <Input
                  id="final-price"
                  type="number"
                  placeholder="Ingrese el percio final"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="profit-percentage">Profit Percentage</Label>
                <Input
                  id="profit-percentage"
                  type="number"
                  placeholder="Ingrese el porcentaje de ganancia"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  type="number"
                  placeholder="Ingrese el stock"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="minimum-stock">Stock minimo</Label>
                <Input
                  id="minimum-stock"
                  type="number"
                  placeholder="Ingrese el stock minimo"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label
                  htmlFor="allow-negative-stock"
                  className="flex items-center gap-2"
                >
                  <Checkbox id="allow-negative-stock" />
                  Permitir stock negativo
                </Label>
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="track-stock"
                  className="flex items-center gap-2"
                >
                  <Checkbox id="track-stock" />
                  Seguimiento de stock
                </Label>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="enabled" className="flex items-center gap-2">
                <Checkbox id="enabled" />
                Disponible
              </Label>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Escriba las anotaciones necesarias"
                className="min-h-[100px]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="taxes">Impuestos</Label>
                <Input
                  id="taxes"
                  type="number"
                  placeholder="Ingrese el porcentaje de impuestos"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="barcode">Codigo de barras</Label>
                <Input id="barcode" placeholder="Ingrese el codigo de barras" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Crear producto</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
