import { MetadataImagen } from "./MetadataImagen";

export interface RequestCrearImagenDTO{
    metadata?: MetadataImagen;
    image?: string;
}