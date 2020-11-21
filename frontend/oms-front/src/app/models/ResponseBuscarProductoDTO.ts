import { StatusServicesI } from "./StatusServices";
import { DataProductoI } from "./DataProducto";

export interface ResponseBuscarProductoDTO{
    status: StatusServicesI;
    data: DataProductoI;
}
