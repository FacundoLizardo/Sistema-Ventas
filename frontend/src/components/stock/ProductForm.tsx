"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import ButtonWithLoading from "../common/ButtonWithLoading";
import { Form } from "../ui/form";
import ProductsServices, {
  IProduct,
} from "@/services/products/ProductsServices";
import AdditionalProductInformation from "./AdditionalProductInformation";
import BasicProductInformation from "./BasicProductInformation";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "../ui/alert-dialog";
import { AlertDialogHeader, AlertDialogFooter } from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { useEffect } from "react";
import { ICategory } from "@/services/cetegories/CategoriesServices";
import { ISubCategory } from "@/services/subCetegories/SubCategoriesServices";
import { useRouter } from "next/navigation";
import { useEditProduct } from "@/context/editProductContect";

const formSchema = z.object({
  name: z.string().min(1, { message: "El nombre es requerido." }),
  categoryId: z.string().optional(),
  subCategoryId: z.string().optional(),
  cost: z
    .number()
    .nonnegative({ message: "El costo no puede ser negativo." })
    .optional(),
  finalPrice: z
    .number()
    .nonnegative({ message: "El precio final no puede ser negativo." })
    .optional(),
  discount: z.number().optional(),
  profitPercentage: z
    .number()
    .gte(0, {
      message: "El porcentaje de ganancia debe ser mayor o igual a 0.",
    })
    .optional(),
  stock: z
    .array(
      z.object({
        branchId: z.string(),
        quantity: z.number(),
        id: z.string().optional(),
      })
    )
    .optional(),
  allowNegativeStock: z.boolean().optional().default(false),
  trackStock: z.boolean().optional().default(false),
  minimumStock: z
    .number()
    .min(0, { message: "El stock mínimo no puede ser negativo." })
    .default(0)
    .optional(),
  enabled: z.boolean(),
  notesDescription: z
    .string()
    .max(255, {
      message: "La descripción no debe superar los 255 caracteres.",
    })
    .optional(),
  taxes: z
    .number()
    .nonnegative({ message: "Las tasas no pueden ser negativas." })
    .optional(),
  barcode: z.string().min(1, { message: "El código de barras es requerido." }),
  branchId: z.string(),
  userId: z.string(),
});

export type ProductFormValues = z.infer<typeof formSchema>;

type ProductFormProps = {
  categories: ICategory[];
  subCategories: ISubCategory[];
  branchId: string;
  companyId: string;
  userId: string;
};

export default function ProductForm({
  categories,
  subCategories,
  branchId,
  companyId,
  userId,
}: ProductFormProps) {
  const router = useRouter();
  const { selectedProduct, selectProduct } = useEditProduct();

  const defaultValues = {
    name: "",
    categoryId: undefined,
    subCategoryId: undefined,
    cost: undefined,
    finalPrice: undefined,
    discount: 0,
    profitPercentage: undefined,
    stock: [
      {
        quantity: 0,
        branchId,
      },
    ],
    allowNegativeStock: true,
    trackStock: false,
    minimumStock: 0,
    enabled: true,
    notesDescription: "",
    taxes: undefined,
    barcode: "",
    branchId,
    userId,
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    if (selectedProduct) {
      form.reset({
        name: selectedProduct.name,
        categoryId: selectedProduct.category?.id,
        subCategoryId: selectedProduct.subCategory?.id,
        cost: selectedProduct.cost || 0,
        finalPrice: selectedProduct.finalPrice,
        discount: selectedProduct.discount,
        profitPercentage: selectedProduct.profitPercentage || 0,
        stock: selectedProduct?.stock?.map((s) => ({
          branchId: s.branchId,
          quantity: s.quantity,
          id: s.id,
        })),
        allowNegativeStock: selectedProduct.allowNegativeStock,
        trackStock: selectedProduct.trackStock,
        minimumStock: selectedProduct.minimumStock,
        enabled: selectedProduct.enabled,
        notesDescription: selectedProduct.notesDescription,
        taxes: selectedProduct.taxes || 0,
        barcode: selectedProduct.barcode,
        branchId,
        userId,
      });
    }
  }, [selectedProduct, form, branchId, userId]);

  const cost = form.watch("cost");
  const taxes = form.watch("taxes");
  const discount = form.watch("discount");
  const profitPercentage = form.watch("profitPercentage");

  useEffect(() => {
    if (cost !== undefined) {
      let finalPrice = cost;

      if (taxes) {
        finalPrice += (finalPrice * taxes) / 100;
      }

      if (discount) {
        finalPrice -= (finalPrice * discount) / 100;
      }

      if (profitPercentage) {
        finalPrice += (finalPrice * profitPercentage) / 100;
      }

      if (userId) {
        form.setValue("userId", userId);
      }

      if (branchId) {
        form.setValue("branchId", branchId);
      }

      form.setValue("finalPrice", Math.round(finalPrice));
    }
  }, [cost, taxes, discount, profitPercentage, userId, branchId, form]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const formattedData = {
      ...data,
      stock:
        data?.stock?.map((item) => ({
          id: item.id || undefined,
          branchId: item.branchId,
          quantity: item.quantity,
        })) || [],
      name: data.name.toLowerCase(),
    };

    const request: IProduct = selectedProduct
      ? await ProductsServices.put({
          params: formattedData,
          productId: selectedProduct.id,
        })
      : await ProductsServices.post({
          params: formattedData,
          companyId,
        });

    toast.promise(Promise.resolve(request), {
      loading: selectedProduct
        ? "Actualizando el producto..."
        : "Creando el producto...",
      success: () => {
        form.reset(defaultValues);
        router.refresh();
        selectProduct(null);
        return selectedProduct
          ? "El producto fue actualizado con éxito."
          : "El producto fue creado con éxito.";
      },
      error: "Error al procesar el producto.",
    });
  };

  const { isDirty, isValid, isSubmitting } = form.formState;
  const submitDisabled = !isDirty || !isValid;

  return (
    <Card>
      <Form {...form}>
        <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Crear o editar un producto</CardTitle>
            <CardDescription>
              Rellena el formulario a continuación para añadir un nuevo producto
              o actualizar uno existente.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-[1fr_35%]">
            <BasicProductInformation
              form={form}
              categories={categories}
              subCategories={subCategories}
            />
            <AdditionalProductInformation form={form} />
          </CardContent>
          <CardFooter className="flex justify-center gap-4 bg-muted/50 px-3 py-2 md:px-6 md:py-4 rounded-md">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size={"sm"} variant="outline">
                  Resetear
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    ¿Estás seguro de que quieres resetear?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta acción no puede deshacerse. Esto reseteará el
                    formulario y limpiará todos los campos.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      form.reset(defaultValues)
                      selectProduct(null)
                    }}
                  >
                    Confirmar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <ButtonWithLoading
              loading={isSubmitting}
              loadingText={
                selectedProduct
                  ? "Actualizando el producto..."
                  : "Creando el producto..."
              }
              variant="gradient"
              size={"sm"}
              type="submit"
              disabled={submitDisabled}
            >
              {selectedProduct ? "Actualizar" : "Crear producto"}
            </ButtonWithLoading>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
