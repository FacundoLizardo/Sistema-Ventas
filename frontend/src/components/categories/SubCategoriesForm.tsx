import { useForm } from "react-hook-form";
import { Form, FormField, FormItem } from "../ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import ButtonWithLoading from "../common/ButtonWithLoading";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import SubCategoriesServices from "@/services/subCetegories/SubCategoriesServices";
import { toast } from "sonner";
import { Combobox } from "../common/Combobox";

const formSchema = z.object({
  name: z.string().min(1, { message: "El nombre es obligatorio" }),
  description: z.string().optional(),
  categoryId: z
    .string()
    .min(1, { message: "La categoría principal es obligatoria" }),
});

type SubCategoriesFormProps = {
  isSubCategoryFormActive: boolean;
  companyId: string;
  handleView: (newValue: boolean) => void;
  categories: { name: string; id: string }[];
};

export default function SubCategoriesForm({
  companyId,
  isSubCategoryFormActive,
  categories = [],
  handleView,
}: SubCategoriesFormProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      categoryId: "",
    },
    mode: "onChange",
  });

  const categoriesData = Array.isArray(categories)
    ? categories.map((category) => ({
        value: category.id,
        label: category.name.slice(0, 1).toUpperCase() + category.name.slice(1),
      }))
    : [];

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const formattedData = {
      name: data.name.toLowerCase(),
      description: data?.description,
      categoryId: data.categoryId,
    };

    const request = await SubCategoriesServices.post({
      params: formattedData,
      companyId,
    });

    toast.promise(Promise.resolve(request), {
      loading: "Creando la subcategoría...",
      success: () => {
        form.reset();
        router.refresh();
        return "La subcategoría fue creada con éxito.";
      },
      error: "Error al crear la subcategoría.",
    });
  };
  console.log("datos del formulario", form.getValues());
  const { isDirty, isValid, isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader className="flex flex-row justify-between">
            <div>
              <CardTitle>Subcategoría</CardTitle>
              <CardDescription>
                Active las opción de sub categorias para crear.
              </CardDescription>
            </div>
            <div className="flex items-center">
              <Switch
                checked={isSubCategoryFormActive}
                onCheckedChange={() => handleView(!isSubCategoryFormActive)}
                aria-label={
                  isSubCategoryFormActive
                    ? "Activar Subcategorías"
                    : "Activar Categorías"
                }
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid lg:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="categoryId">Categoría Principal</Label>
                    <Combobox
                      options={categoriesData}
                      formValue={field.value}
                      onChange={field.onChange}
                      disabled={!isSubCategoryFormActive}
                    />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="name">Nombre de la Subcategoría</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Ingresa el nombre..."
                      disabled={!isSubCategoryFormActive}
                      {...field}
                    />
                  </FormItem>
                )}
              />
            </div>

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
                    disabled={!isSubCategoryFormActive}
                  />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <ButtonWithLoading
              variant="outline"
              type="submit"
              disabled={!isSubCategoryFormActive || !isDirty || !isValid}
              loadingText={"Guardando..."}
              size={"sm"}
              loading={isSubmitting}
            >
              Guardar Categoría
            </ButtonWithLoading>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
