import { StatusServicesI } from "./StatusServices";
import { DataProductoI } from "./DataProducto";
import { RequestCrearProductoDTO } from "./RequestCrearProductoDTO";

export interface ResponseBuscarProductoDTO{
    status: StatusServicesI;
    data: DataProductoI;
    product: RequestCrearProductoDTO;
}
