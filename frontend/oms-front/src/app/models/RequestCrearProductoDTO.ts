import { IdDescripcionI } from "./IdDescripcion"
import { ImagenI } from "./Imagen"
import { RequestCrearProveedorDTO } from "./RequestCrearProveedorDTO"

export interface RequestCrearProductoDTO{
    productId?: string;
    productCode?: string;
    productName?: string;
    productDescription?: string;
    startDate?: string;
    endDate?: string;
    type?: IdDescripcionI;
    productPrice?: number;
    originCity?: string;
    destinationCity?: string;
    image?: ImagenI;
    vendorId?: string;
    vendor?: RequestCrearProveedorDTO;
    action?: string;
}