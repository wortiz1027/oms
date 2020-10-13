import { Injectable } from '@angular/core';
import { DepartamentoI } from 'src/app/models/Departamento';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private listDepartamentos: DepartamentoI [] = [
    {
      name: "Cundinamarca",
      value: "1",
      codigoPais: "1"
    },
    {
      name: "Tolima",
      value: "2",
      codigoPais: "1"
    }
  ];

  constructor() { }

  getListDepartamentos(): DepartamentoI[]{
    return this.listDepartamentos;
  }
}
