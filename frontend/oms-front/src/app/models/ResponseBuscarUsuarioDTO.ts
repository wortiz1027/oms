import { StatusServicesI } from "./StatusServices";
import { BuscarUsuarioDTO } from "./BuscarUsuarioDTO";

export interface ResponseBuscarUsuarioDTO{
    status: StatusServicesI;
    totalItems: number;
    totalPages: number;
    currentPage: number;
    user: BuscarUsuarioDTO;
    users: BuscarUsuarioDTO[];
}