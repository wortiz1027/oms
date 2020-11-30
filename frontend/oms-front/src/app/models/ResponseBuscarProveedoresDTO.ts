import { RequestCrearProveedorDTO } from "./RequestCrearProveedorDTO";
import { StatusServicesI } from "./StatusServices";

export interface ResponseBuscarProveedoresDTO{
    status: StatusServicesI;
    vendors: RequestCrearProveedorDTO[];
}