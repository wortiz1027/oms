import { Injectable } from '@angular/core';
import { TipoProveedorI } from 'src/app/models/TipoProveedor';

@Injectable()

export class TipoProveedorService {

  private listTipoProveedor: TipoProveedorI [] = [
    {
      name: "Evento",
      value: "1"
    },
    {
      name: "Hospedaje",
      value: "2"
    },
    {
      name: "Transporte",
      value: "3"
    }
  ];

  constructor() { }

  getListTipoProveedor(): TipoProveedorI[]{
    return this.listTipoProveedor;
  }
}
