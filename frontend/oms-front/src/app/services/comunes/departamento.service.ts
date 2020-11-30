import { Injectable } from '@angular/core';
import { DepartamentoI } from 'src/app/models/Departamento';

@Injectable()

export class DepartamentoService {

  private listDepartamentos: DepartamentoI [] = [
    {
      name: "Antioquia",
      value: "1",
      codigoPais: "1"
    },
    {
      name: "Atlántico",
      value: "2",
      codigoPais: "1"
    },
    {
      name: "Caldas",
      value: "3",
      codigoPais: "1"
    },
    {
      name: "Cundinamarca",
      value: "4",
      codigoPais: "1"
    },{
      name: "Santander",
      value: "5",
      codigoPais: "1"
    },
    {
      name: "Tolima",
      value: "6",
      codigoPais: "1"
    },
    {
      name: "Valle del Cauca",
      value: "7",
      codigoPais: "1"
    }
  ];

  constructor() { }

  getListDepartamentos(): DepartamentoI[]{
    return this.listDepartamentos;
  }
}
