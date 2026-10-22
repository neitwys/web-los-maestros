import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { obtenerSesion } from "../../services/sesionService";
import type { RolUsuario } from "../../data/usuariosData";

interface RutaProtegidaProps {
  children: ReactNode;
  rolRequerido?: RolUsuario; // Si no se indica, basta con haber iniciado sesión
}

// Protege una ruta: sin sesión lleva a /login; con un rol distinto al requerido lleva al inicio.
function RutaProtegida({ children, rolRequerido }: RutaProtegidaProps) {
  const sesion = obtenerSesion();

  if (!sesion) {
    return <Navigate to="/login" replace />;
  }

  if (rolRequerido && sesion.rol !== rolRequerido) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default RutaProtegida;