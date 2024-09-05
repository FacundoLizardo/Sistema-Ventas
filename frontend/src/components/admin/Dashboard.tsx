"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IoMenu } from "react-icons/io5";

export default function Dashboard() {
  return (
    <div className="grid auto-rows-max items-start my-10 gap-4 md:gap-8 lg:col-span-2">
      <Tabs defaultValue="usuarios">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="usuarios">Usuarios</TabsTrigger>
            <TabsTrigger value="empresas">Empresas</TabsTrigger>
            <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="usuarios">
          <Card x-chunk="dashboard-05-chunk-3">
            <CardHeader className="px-7">
              <CardTitle>Usuarios</CardTitle>
              <CardDescription>
                Gestiona los usuarios de tu sistema.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Correo
                    </TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Empresa
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Fecha de registro
                    </TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Olivia Smith</div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      olivia@example.com
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      Acme Inc
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      2023-06-24
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="default"
                          >
                            <IoMenu className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Editar</DropdownMenuItem>
                          <DropdownMenuItem>Eliminar</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Noah Williams</div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      noah@example.com
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      Acme Inc
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      2023-06-25
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="default"
                          >
                            <IoMenu className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Editar</DropdownMenuItem>
                          <DropdownMenuItem>Eliminar</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Emma Brown</div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      emma@example.com
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      Acme Inc
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      2023-06-26
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="default"
                          >
                            <IoMenu className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Editar</DropdownMenuItem>
                          <DropdownMenuItem>Eliminar</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="empresas">
          <Card x-chunk="dashboard-05-chunk-3">
            <CardHeader className="px-7">
              <CardTitle>Empresas</CardTitle>
              <CardDescription>
                Gestiona las empresas de tu sistema.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Dirección
                    </TableHead>
                  </TableRow>
                </TableHeader>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card x-chunk="dashboard-05-chunk-0">
        <CardHeader className="pb-3">
          <CardTitle>Crear nuevo usuario</CardTitle>
          <CardDescription className="max-w-lg text-balance leading-relaxed">
            Crea nuevos usuarios y gestiona los existentes.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button>Crear nuevo usuario</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
