import { Injectable } from '@angular/core';
import { StatusCliente } from 'src/app/models/StatusCliente';

@Injectable()

export class StatusClienteService {

  private listStatusCliente: StatusCliente [] = [
    {
      type: "1",
      code: "PLT", 
      description: "Platino"
    },
    {
      type: "2",
      code: "DRD", 
      description: "Dorado"
    },
    {
      type: "3",
      code: "PLO", 
      description: "Plateado"
    }
  ];

  constructor() { }

  getListStatusCliente(): StatusCliente[]{
    return this.listStatusCliente;
  }
}
