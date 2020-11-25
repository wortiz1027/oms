import { ImagenI } from "./Imagen"

export interface RequestCrearCampaniaDTO{
    campaignId?: string;
    campaignCode?: string;
    campaignName?: string;
    campaignDescription?: string;
    startDate?: string;
    endDate?: string;
    discount?: number;
    status?: string;
    action?: string;
    image?: ImagenI;
}