"use client";

import { useForm } from "react-hook-form";
import { Form, FormField, FormItem } from "../ui/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ButtonWithLoading from "../common/ButtonWithLoading";
import CategoriesServices from "@/services/cetegories/CategoriesServices";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription } from "../ui/alert";
import { AlertTriangle } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, { message: "El nombre es obligatorio" }),
  description: z.string().optional(),
});

type CategoriesFormProps = {
  isSubCategoryFormActive: boolean;
  companyId: string;
};

export default function CategoriesForm({
  isSubCategoryFormActive,
  companyId,
}: CategoriesFormProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const formattedData = {
      name: data.name.toLowerCase(),
      description: data?.description,
    };

    const request = await CategoriesServices.post({
      params: formattedData,
      companyId,
    });

    toast.promise(Promise.resolve(request), {
      loading: "Creando el comprobante...",
      success: () => {
        form.reset();
        router.refresh();
        return "La categoría fue creada con éxito.";
      },
      error: "Error al crear la categoría.",
    });
  };

  const { isDirty, isValid, isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 md:gap-6 justify-center">
          <Alert>
            <AlertTriangle size={16} />
            <AlertDescription>
              Recuerda que el nombre de la categoría debe ser único para evitar
              confusiones en la organización de los productos.
            </AlertDescription>
          </Alert>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="name">Nombre de la categoría</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Ingresa el nombre de la nueva categoría"
                  disabled={isSubCategoryFormActive}
                  {...field}
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  placeholder="Describe brevemente esta categoría"
                  {...field}
                  disabled={isSubCategoryFormActive}
                />
              </FormItem>
            )}
          />
          <div className="flex">
            <ButtonWithLoading
              variant="default"
              type="submit"
              size={"sm"}
              disabled={isSubCategoryFormActive || !isDirty || !isValid}
              loadingText={"Guardando..."}
              loading={isSubmitting}
            >
              Guardar Categoría
            </ButtonWithLoading>
          </div>
        </div>
      </form>
    </Form>
  );
}
