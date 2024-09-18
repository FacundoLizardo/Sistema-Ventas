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
import { Form } from "../ui/form";
import { IBranch } from "@/services/branches/BranchesServices";
import { Button } from "../ui/button";
import { toast } from "sonner";
import UsersServices, { IUser } from "@/services/user/UsersServices";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { SearchIcon } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../ui/table";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

const BranchTable = ({
  branches,
  onSelectBranch,
}: {
  branches: IBranch[];
  onSelectBranch: (branchId: string) => void;
}) => {
  return (
    <ScrollArea className="flex flex-col h-[300px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Punto de Venta</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {branches.length > 0 ? (
            branches.map((branch) => (
              <TableRow key={branch.id}>
                <TableCell>{branch.name}</TableCell>
                <TableCell>{branch.ptoVta}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    onClick={() => onSelectBranch(branch.id)}
                  >
                    Elegir
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                No hay sucursales disponibles
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <ScrollBar className="flex" /> {/* Asegúrate de que ScrollBar esté correctamente estilizado */}
    </ScrollArea>
  );
};

const formSchema = z.object({
  branch: z.string().min(1, { message: "Debe seleccionar una sucursal." }),
});

export default function SelectBranch({
  branches,
  userId,
  locale,
  companyId,
  user,
}: {
  branches: IBranch[];
  userId?: string;
  locale: string;
  companyId: string;
  user?: IUser;
}) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentBranch, setCurrentBranch] = useState<string | null>(
    user?.branchId ?? null
  );
  const [selectNewBranch, setSelectNewBranch] = useState<string | null>(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      branch: selectNewBranch ?? "",
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
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="absolute bg-background w-full min-h-screen flex place-content-center items-center"
        >
          <Card className="relative flex max-w-[90%] min-h-80 md:w-full md:max-w-xl mx-auto my-10">
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
                {currentBranch && !selectNewBranch ? (
                  <div className="flex flex-col gap-2">
                    <blockquote className="border-l-2 pl-6 italic">
                      <p>Sucursal actual asignada</p>
                      <p className="font-bold text-xl text-secondary">
                        {
                          branches.find(
                            (branch) => branch.id === user?.branchId
                          )?.name
                        }
                      </p>
                    </blockquote>
                  </div>
                ) : selectNewBranch ? (
                  <div className="flex flex-col gap-2">
                    <blockquote className="border-l-2 pl-6 italic">
                      <p>Sucursal seleccionada</p>
                      <p className="font-bold text-xl text-secondary">
                        {
                          branches.find(
                            (branch) => branch.id === selectNewBranch
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

              {!currentBranch && (
                <div className="flex flex-col gap-3">
                  <div className="flex flex-row items-center gap-2 px-2 bg-card-foreground rounded-md">
                    <Input
                      type="text"
                      placeholder="Buscar sucursal..."
                      className="bg-transparent border-none"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <SearchIcon className="text-background mx-2" />
                  </div>
                  <div className="flex flex-col gap-2 max-h-80 overflow-y-auto custom-scrollbar">
                    <BranchTable
                      branches={filteredBranches}
                      onSelectBranch={(branchId) => {
                        setSelectNewBranch(branchId);
                        setCurrentBranch(branchId);
                        form.setValue("branch", branchId);
                      }}
                    />
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              {selectNewBranch && (
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
              {currentBranch && !selectNewBranch && (
                <Button
                  variant="accent"
                  className="w-full"
                  onClick={() => {
                    setSelectNewBranch(null), setCurrentBranch(null);
                  }}
                >
                  Cambiar sucursal
                </Button>
              )}
              {selectNewBranch && (
                <Button
                  variant="accent"
                  className="w-full"
                  onClick={() => {
                    setSelectNewBranch(null), setCurrentBranch(null);
                  }}
                >
                  Cambiar selección
                </Button>
              )}
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
