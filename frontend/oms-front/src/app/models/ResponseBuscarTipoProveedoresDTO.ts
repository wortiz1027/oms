import { StatusServicesI } from "./StatusServices";
import { IdDescripcionI } from "./IdDescripcion";

export interface ResponseBuscarTipoProveedoresDTO{
    status: StatusServicesI;
    types: IdDescripcionI[];
}