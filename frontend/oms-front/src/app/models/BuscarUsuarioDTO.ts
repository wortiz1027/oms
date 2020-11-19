import { RolesUsuario } from "./RolesUsuario"
import { StatusCliente } from "./StatusCliente"

export interface BuscarUsuarioDTO{
    idUser?: number;
    cedula?: number;
    nombre?: string;
    apellido?: string;
    direccion?: string;
    fechaNacimiento?: string;
    telefono?: string;
    email?: string;
    username?: string;
    enable?: string;
    accountNonExpired?: string;
    credentialNonExpired?: string;
    accountNonLocket?: string;
    roles?: Array<RolesUsuario>;
    types?: StatusCliente;
}
