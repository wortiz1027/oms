import { StatusServicesI } from "./StatusServices";
import { ProductoCampaniaI } from "./ProductoCampania";

export interface ResponseBuscarProductoCampaniaDTO{
    status?: StatusServicesI;
    campaign?: ProductoCampaniaI;
}
