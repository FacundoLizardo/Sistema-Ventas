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
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

export default function SubCategoriesForm() {
  const form = useForm();
  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="name">Nombre de la categoría</Label>
              <Input
                id="name"
                placeholder="Nombre de la categoría"
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
              <Textarea id="description" placeholder="description" {...field} />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
