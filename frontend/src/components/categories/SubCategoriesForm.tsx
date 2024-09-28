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

type SubCategoriesFormProps = {
  isSubCategoryFormActive: boolean;
  handleView: (isSubCategoryFormActive: boolean) => void;
};

export default function SubCategoriesForm({
  isSubCategoryFormActive,
  handleView,
}: SubCategoriesFormProps) {
  const form = useForm();

  const { isDirty, isValid, isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form>
        <Card>
          <CardHeader className="flex flex-row justify-between">
            <div>
              <CardTitle>Sub Categoría</CardTitle>
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
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="name">Categoría Principal</Label>
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

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="name">Nombre de la Sub Categoría</Label>
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
