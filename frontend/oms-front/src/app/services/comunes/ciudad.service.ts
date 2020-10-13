import { Injectable } from '@angular/core';
import { CiudadI } from 'src/app/models/Ciudad';

@Injectable()
export class CiudadService {

  private listCiudades: CiudadI [] = [
    {
      name: "Bogota DC",
      value: "1",
      codigoDepartamento: "1"
    },
    {
      name: "Soacha",
      value: "2",
      codigoDepartamento: "1"
    },
    {
      name: "Girardot",
      value: "3",
      codigoDepartamento: "1"
    },
    {
      name: "Ibague",
      value: "1",
      codigoDepartamento: "2"
    },
    {
      name: "Melgar",
      value: "2",
      codigoDepartamento: "2"
    },
    {
      name: "Espinal",
      value: "3",
      codigoDepartamento: "2"
    }
  ];

  constructor() { }

  getListCiudades(): CiudadI[]{
    return this.listCiudades;
  }
}
