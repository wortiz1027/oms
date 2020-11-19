import { StatusServicesI } from "./StatusServices";
import { RequestCrearUsuarioDTO } from "./RequestCrearUsuarioDTO";

export interface ResponseCrearUsuarioDTO{
    status: StatusServicesI;
    user: RequestCrearUsuarioDTO;
}