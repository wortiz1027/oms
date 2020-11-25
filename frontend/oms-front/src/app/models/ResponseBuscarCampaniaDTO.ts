import { StatusServicesI } from "./StatusServices";
import { DataCampaniaI } from "./DataCampania";
import { RequestCrearCampaniaDTO } from "./RequestCrearCampaniaDTO";

export interface ResponseBuscarCampaniaDTO{
    status: StatusServicesI;
    data: DataCampaniaI;
    campaing: RequestCrearCampaniaDTO;
}