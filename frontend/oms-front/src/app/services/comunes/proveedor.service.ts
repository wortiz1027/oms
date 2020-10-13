import { Injectable } from '@angular/core';
import { ProveedoresI } from 'src/app/models/Proveedores';

@Injectable()
export class ProveedorService {

  private listProveedores: ProveedoresI [] = [
    {
      name: "Futbol",
      value: "1",
      tipoProveedor: "1"
    },
    {
      name: "Hotel Indio Pijao",
      value: "2",
      tipoProveedor: "2"
    },
    {
      name: "Hotel Neojaveriano",
      value: "3",
      tipoProveedor: "2"
    },
    {
      name: "Uber",
      value: "4",
      tipoProveedor: "3"
    },
    {
      name: "Helicoptero",
      value: "5",
      tipoProveedor: "3"
    }
  ];

  constructor() { }

  getListProveedores(): ProveedoresI[]{
    return this.listProveedores;
  }
}
