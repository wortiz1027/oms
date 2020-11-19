import { Injectable } from '@angular/core';
import { TipoProductosI } from 'src/app/models/TipoProductos';

@Injectable()

export class TipoProductoService {

  private listTipoProductos: TipoProductosI [] = [
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

  getListTipoProductos(): TipoProductosI[]{
    return this.listTipoProductos;
  }
}
