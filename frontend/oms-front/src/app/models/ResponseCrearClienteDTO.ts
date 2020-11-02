import { ClienteDTO } from "./ClienteDTO";
import { StatusServicesI } from "./StatusServices";

export interface ResponseCrearClienteDTO{
    status: StatusServicesI;
    user: ClienteDTO;
}