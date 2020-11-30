import { InfoOrdenI } from "./InfoOrden";

export interface DataOrdenI{
    totalItems: number;
    totalPages: number;
    currentPage: number;
    orders: InfoOrdenI[];
}