import { RequestCrearCampaniaDTO } from "./RequestCrearCampaniaDTO";

export interface DataCampaniaI{
    totalItems: number;
    totalPages: number;
    currentPage: number;
    campaigns: RequestCrearCampaniaDTO[];
    products: RequestCrearCampaniaDTO[];
}