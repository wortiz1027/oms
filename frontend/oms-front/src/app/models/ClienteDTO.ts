import { RolesCliente } from "./RolesCliente";
import { StatusCliente } from "./StatusCliente";

export interface ClienteDTO{
    codigo?: string;
    cedula?: string;
    nombres?: string;
    apellidos?: string;
    direccion?: string;
    fechaNacimiento?: Date;
    telefono?: string;
    email?: string;
    username?: string;
    password?: string;
    enable?: string;
    accountNonExpired?: string;
    credentialNonExpired?: string;
    accountNonLocket?: string;
    roles?: Array<RolesCliente>;
    types?: StatusCliente;
}
