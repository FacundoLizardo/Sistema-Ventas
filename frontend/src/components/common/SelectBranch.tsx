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
import { z } from "zod";
import { useState } from "react";
import ButtonWithLoading from "../common/ButtonWithLoading";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import BranchesServices, {
  IBranch,
} from "@/services/branches/BranchesServices";
import { Button } from "../ui/button";
import { toast } from "sonner";

// Esquema de validación con Zod
const formSchema = z.object({
  branch: z.string().min(1, { message: "Debe seleccionar una sucursal." }),
});

export default function SelectBranch({
  companyBranches,
  userBranch,
  userId,
}: {
  companyBranches: IBranch[];
  userBranch?: string;
  userId?: string;
}) {
  console.log(userId);

  const [selectedBranch, setSelectedBranch] = useState<string | null>(
    userBranch ?? null
  );

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      branch: selectedBranch ?? "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);

    /* toast.promise(request, {
      loading: "Creando el producto...",
      success: () => {
        form.reset();
        return "El producto fue creado con exito.";
      },
      error: "Error al crear el producto.",
    }); */
  };

  return (
    <div>
      <Form {...form}>
        <Card className="w-[90%] m-auto md:max-w-xl">
          <CardHeader>
            <CardTitle>Punto de venta</CardTitle>
            <CardDescription>
              Selecciona un punto de venta para continuar. Es importante elegir
              correctamente, ya que todas las operaciones se registrarán en la
              sucursal seleccionada. Podrás cambiarla más adelante si es
              necesario.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              {userBranch && !selectedBranch ? (
                <div className="flex flex-col gap-2">
                  <blockquote className="border-l-2 pl-6 italic">
                    <p>Sucursal actual asignada</p>
                    <p className="font-bold text-xl text-secondary">
                      {
                        companyBranches.find(
                          (branch) => branch.id === userBranch
                        )?.name
                      }
                    </p>
                  </blockquote>
                </div>
              ) : selectedBranch ? (
                <div className="flex flex-col gap-2">
                  <blockquote className="border-l-2 pl-6 italic">
                    <p>Sucursal seleccionada</p>
                    <p className="font-bold text-xl text-secondary">
                      {
                        companyBranches.find(
                          (branch) => branch.id === selectedBranch
                        )?.name
                      }
                    </p>
                  </blockquote>
                </div>
              ) : (
                <p className="text-sm">El usuario no tiene una sucursal asignada</p>
              )}
            </div>

            {!selectedBranch && (
              <div className="flex flex-col gap-2">
                {companyBranches.map((branch) => (
                  <FormField
                    key={branch.id}
                    name="branch"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Button
                            variant="ghost"
                            className="w-full"
                            onClick={() => {
                              setSelectedBranch(branch.id);
                              field.onChange(branch.id);
                            }}
                          >
                            <p>{branch.name}</p>
                          </Button>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter>
            {!userBranch && selectedBranch && (
              <ButtonWithLoading
                loadingText="Cargando..."
                type="submit"
                loading={false}
                className="w-full"
                variant={"gradient"}
                onClick={form.handleSubmit(onSubmit)}
              >
                Asignar sucursal
              </ButtonWithLoading>
            )}

            {/* Si ya hay una sucursal asignada, mostrar botón de cambiar */}
            {userBranch && (
              <Button
                variant="accent"
                className="w-full"
                onClick={() => setSelectedBranch(null)}
              >
                Cambiar sucursal
              </Button>
            )}
          </CardFooter>
        </Card>
      </Form>
    </div>
  );
}
