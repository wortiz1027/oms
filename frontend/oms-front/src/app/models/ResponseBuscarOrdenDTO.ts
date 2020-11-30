import { DataOrdenI } from "./DataOrden";
import { InfoOrdenI } from "./InfoOrden";
import { StatusServicesI } from "./StatusServices";

export interface ResponseBuscarOrdenDTO{
    status: StatusServicesI;
    data: DataOrdenI;
    order: InfoOrdenI;
}