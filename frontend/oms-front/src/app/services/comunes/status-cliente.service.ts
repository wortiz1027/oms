import { Injectable } from '@angular/core';
import { StatusClienteI } from 'src/app/models/StatusCliente';

@Injectable()

export class StatusClienteService {

  private listStatusCliente: StatusClienteI [] = [
    {
      name: "Platinum",
      value: "1"
    },
    {
      name: "Gold",
      value: "2"
    },
    {
      name: "Silver",
      value: "3"
    }
  ];

  constructor() { }

  getListStatusCliente(): StatusClienteI[]{
    return this.listStatusCliente;
  }
}
