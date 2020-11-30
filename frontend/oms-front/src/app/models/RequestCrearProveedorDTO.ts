import { IdDescripcionI } from "./IdDescripcion"

export interface RequestCrearProveedorDTO{
    idProvider?: string;
    nameProvider?: string;
    nit?: string;
    address?: string;
    telephone?: string;
    email?: string;
    idCountry?: string;
    idProvince?: string;
    idCity?: string;
    types?: IdDescripcionI;
}