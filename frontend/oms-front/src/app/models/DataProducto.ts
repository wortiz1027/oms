import { RequestCrearProductoDTO } from "./RequestCrearProductoDTO";

export interface DataProductoI{
    totalItems: number;
    totalPages: number;
    currentPage: number;
    products: RequestCrearProductoDTO[];
}
