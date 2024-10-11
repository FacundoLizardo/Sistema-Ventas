import CustomersServices, {
  ICustomer,
} from "@/services/customers/CustomersServices";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { MoreHorizontal, SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { useState } from "react";
import { capitalizeWords } from "@/lib/capitalizeWords";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type ClientsMonitoringProps = {
  customers: ICustomer[];
  companyId: string;
  isSuperAdmin: boolean;
  isOwner: boolean;
  isAdmin: boolean;
};

export default function ClientsMonitoring({
  customers,
  companyId,
  isSuperAdmin,
  isOwner,
  isAdmin,
}: ClientsMonitoringProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = customers.filter((customer) => {
    const displayName =
      customer.customerType === "company"
        ? customer.companyName || "Nombre de empresa desconocido"
        : `${customer.firstName || ""} ${customer.lastName || ""}`.trim() ||
          "Nombre de persona desconocido";

    const capitalizedDisplayName = capitalizeWords(displayName);

    return capitalizedDisplayName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

  const handleDelete = (customerId: string) => {
    try {
      const request = CustomersServices.delete({ companyId, id: customerId });

      toast.promise(request, {
        loading: "Eliminando...",
        success: () => {
          router.refresh();
          return "El cliente fue eliminado con exito.";
        },
        error: (error) => {
          console.error("Error al eliminar:", error);
          return `Error al eliminar el cliente.`;
        },
      });
    } catch (error) {
      console.error("Error en el bloque catch:", error);
      toast.error("Error al eliminar el cliente.");
    }
  };

  const canDeleteCustomer = isSuperAdmin || isOwner || isAdmin;

  return (
    <div className="grid w-full">
      <div className="flex w-full border rounded-md bg-background flex-1 items-center gap-2 my-4">
        <Input
          type="text"
          placeholder="Buscar por nombre de cliente..."
          className="bg-transparent border-none text-primary"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchIcon className="text-muted-foreground size-5 mr-4" />
      </div>

      <ScrollArea className="h-[600px]">
        <Table>
          <TableCaption>Lista de clientes</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Correo</TableHead>
              <TableHead>Teléfono</TableHead>
              {canDeleteCustomer && <TableHead>Acción</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => {
                const displayName =
                  customer.customerType === "company"
                    ? customer.companyName || "Nombre de empresa desconocido"
                    : `${customer.firstName || ""} ${
                        customer.lastName || ""
                      }`.trim() || "Nombre de persona desconocido";

                const capitalizedDisplayName = capitalizeWords(displayName);

                return (
                  <TableRow key={customer.id}>
                    <TableCell>{customer.docNro}</TableCell>
                    <TableCell>{capitalizedDisplayName}</TableCell>
                    <TableCell>{customer.email || "Sin correo"}</TableCell>
                    <TableCell>
                      {customer.phoneNumber || "Sin teléfono"}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="flex flex-col text-sm outline-none transition-colors items-start"
                        >
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuItem>Editar</DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            {canDeleteCustomer && (
                              <AlertDialog>
                                <AlertDialogTrigger className="px-2 py-1.5 hover:bg-accent hover:text-accent-foreground rounded-md">
                                  Eliminar
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      ¿Estás seguro de que quieres eliminar este
                                      cliente?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Esta acción no puede deshacerse. Esto
                                      eliminará al cliente.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancelar
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDelete(customer.id)}
                                    >
                                      Confirmar
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            )}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={4}>No hay clientes registrados.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <ScrollBar orientation="horizontal" className="flex" />
        <ScrollBar orientation="vertical" className="flex" />
      </ScrollArea>
    </div>
  );
}
