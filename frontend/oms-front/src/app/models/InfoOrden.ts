import { CustomerI } from "./Customer"
import { PaymentI } from "./Payment"
import { ProductI } from "./Product"
import { StatusServicesI } from "./StatusServices"

export interface InfoOrdenI{
    id?: string;
    code?: string;
    creationDate?: string;
    customer?: CustomerI[];
    products?: ProductI[];
    payment?: PaymentI;
    state?: StatusServicesI;
    total?: number;
}