"use client";

import { useState, useMemo } from "react";
import {
  useAllUsers,
  useDeleteUser,
  useReactivateUser,
} from "@/hooks/useUsers";
import type { User } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Search,
  Trash2,
  RotateCcw,
  Users,
  Filter,
  MoreHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const UserTable = () => {
  const { data, isLoading } = useAllUsers();
  const deleteUser = useDeleteUser();
  const reactivateUser = useReactivateUser();

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Filtrar usuarios basado en búsqueda y filtros
  const filteredUsers = useMemo(() => {
    if (!data?.users) return [];

    return data.users.filter((user: User) => {
      const matchesSearch =
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.profile?.fullName
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        user.id.toString().includes(searchTerm);

      const matchesRole = roleFilter === "all" || user.role === roleFilter;
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && user.isActive) ||
        (statusFilter === "inactive" && !user.isActive);

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [data?.users, searchTerm, roleFilter, statusFilter]);

  const handleDeleteUser = (userId: number) => {
    deleteUser.mutate(userId);
  };

  const handleReactivateUser = (userId: number) => {
    reactivateUser.mutate(userId);
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "destructive";
      case "SELLER":
        return "default";
      case "CUSTOMER":
        return "secondary";
      default:
        return "outline";
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Gestión de Usuarios
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
            </div>
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Gestión de Usuarios
        </CardTitle>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          {/* Buscador */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar por email, nombre o ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filtros */}
          <div className="flex gap-2">
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-32">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="SELLER">Seller</SelectItem>
                <SelectItem value="CUSTOMER">Customer</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="active">Activos</SelectItem>
                <SelectItem value="inactive">Inactivos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {filteredUsers.length === 0 ? (
          <div className="text-center py-8">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">
              {searchTerm || roleFilter !== "all" || statusFilter !== "all"
                ? "No se encontraron usuarios con los filtros aplicados"
                : "No hay usuarios registrados"}
            </p>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">ID</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead className="text-center">Estado</TableHead>
                  <TableHead className="text-center w-32">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user: User) => (
                  <TableRow key={user.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{user.id}</TableCell>
                    <TableCell className="font-mono text-sm">
                      {user.email}
                    </TableCell>
                    <TableCell>
                      {user.profile?.fullName || "Sin nombre"}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getRoleBadgeVariant(user.role)}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant={user.isActive ? "default" : "secondary"}>
                        {user.isActive ? "Activo" : "Inactivo"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {user.isActive ? (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem
                                  onSelect={(e) => e.preventDefault()}
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Eliminar
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    ¿Estás seguro?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Esta acción desactivará al usuario "
                                    {user.email}". El usuario no podrá acceder
                                    al sistema hasta que sea reactivado.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>
                                    Cancelar
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeleteUser(user.id)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Eliminar
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          ) : (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem
                                  onSelect={(e) => e.preventDefault()}
                                >
                                  <RotateCcw className="w-4 h-4 mr-2" />
                                  Reactivar
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Reactivar Usuario
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    ¿Deseas reactivar al usuario "{user.email}"?
                                    El usuario podrá acceder nuevamente al
                                    sistema.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>
                                    Cancelar
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      handleReactivateUser(user.id)
                                    }
                                    className="bg-green-600 hover:bg-green-700"
                                  >
                                    Reactivar
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Información de resultados */}
        <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
          <span>
            Mostrando {filteredUsers.length} de {data?.users?.length || 0}{" "}
            usuarios
          </span>
          {(searchTerm || roleFilter !== "all" || statusFilter !== "all") && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchTerm("");
                setRoleFilter("all");
                setStatusFilter("all");
              }}
            >
              Limpiar filtros
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
