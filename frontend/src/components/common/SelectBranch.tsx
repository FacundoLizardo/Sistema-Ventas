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
import { IBranch } from "@/services/branches/BranchesServices";
import { Button } from "../ui/button";
import { toast } from "sonner";
import UsersServices from "@/services/user/UsersServices";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { SearchIcon } from "lucide-react";

// Esquema de validación con Zod
const formSchema = z.object({
  branch: z.string().min(1, { message: "Debe seleccionar una sucursal." }),
});

export default function SelectBranch({
  branches,
  branchId,
  userId,
  params: { locale, companyId },
}: {
  branches: IBranch[];
  branchId?: string;
  userId?: string;
  params: { locale: string; companyId: string };
}) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedBranch, setSelectedBranch] = useState<string | null>(
    branchId ?? null
  );

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      branch: selectedBranch ?? "",
    },
  });

  const filteredBranches = branches.filter((branch) =>
    branch.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!userId) return;
    try {
      const request = UsersServices.put(userId, { branchId: data.branch });

      toast.promise(request, {
        loading: "Asignando sucursal...",
        success: async () => {
          router.push(
            `${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/${locale}/${companyId}/sales`
          );
          form.reset();
          return "La sucursal fue asignada con éxito.";
        },
        error: "Error al asignar la sucursal.",
      });

      router.refresh();

      await request;
    } catch (error) {
      console.error("Error al asignar la sucursal:", error);
    }
  };

  const { isDirty, isValid, isSubmitting } = form.formState;

  return (
    <div >
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="absolute bg-background w-full min-h-screen flex place-content-center items-center">
          <Card className="relative flex max-w-[90%] min-h-80 md:w-full md:max-w-md mx-auto my-10">
            <CardHeader>
              <CardTitle>Punto de venta</CardTitle>
              <CardDescription>
                Selecciona un punto de venta para continuar. Es importante
                elegir correctamente, ya que todas las operaciones se
                registrarán en la sucursal seleccionada. Podrás cambiarla más
                adelante si es necesario.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                {branchId && !selectedBranch ? (
                  <div className="flex flex-col gap-2">
                    <blockquote className="border-l-2 pl-6 italic">
                      <p>Sucursal actual asignada</p>
                      <p className="font-bold text-xl text-secondary">
                        {
                          branches.find(
                            (branch) => branch.id === branchId
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
                          branches.find(
                            (branch) => branch.id === selectedBranch
                          )?.name
                        }
                      </p>
                    </blockquote>
                  </div>
                ) : (
                  <p className="text-sm">
                    El usuario no tiene una sucursal asignada
                  </p>
                )}
              </div>

              {!selectedBranch && (
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row items-center gap-2 px-2 bg-card-foreground rounded-md">
                    <Input
                      type="text"
                      placeholder="Buscar sucursal..."
                      className="bg-transparent border-none text-foreground-dark"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <SearchIcon className="text-foreground-dark mx-2" />
                  </div>
                  <div className="flex flex-col gap-2 max-h-80 overflow-y-auto custom-scrollbar">
                    {filteredBranches.map((branch) => (
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
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              {!branchId && selectedBranch && (
                <ButtonWithLoading
                  loading={isSubmitting}
                  loadingText="Asignando..."
                  variant="gradient"
                  className="w-full"
                  size={"default"}
                  type="submit"
                  disabled={(isDirty && !isValid) || isSubmitting}
                >
                  Asignar sucursal
                </ButtonWithLoading>
              )}
              {branchId ||
                (selectedBranch && (
                  <Button
                    variant="accent"
                    className="w-full"
                    onClick={() => setSelectedBranch(null)}
                  >
                    Cambiar sucursal
                  </Button>
                ))}
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
