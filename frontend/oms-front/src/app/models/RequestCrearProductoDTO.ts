import { ImagenI } from "./Imagen"
import { TipoProductoI } from "./TipoProducto"

export interface RequestCrearProductoDTO{
    productId?: string;
    productCode?: string;
    productName?: string;
    productDescription?: string;
    startDate?: string;
    endDate?: string;
    type?: TipoProductoI;
    productPrice?: number;
    originCity?: string;
    destinationCity?: string;
    image?: ImagenI;
    vendorId?: string;
}