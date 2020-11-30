import { Injectable } from '@angular/core';
import { CiudadI } from 'src/app/models/Ciudad';

@Injectable()

export class CiudadService {

  private listCiudades: CiudadI[] = [
    {
      name: "Itagüí",
      value: "1",
      codigoDepartamento: "1"
    },
    {
      name: "Medellín",
      value: "2",
      codigoDepartamento: "1"
    },
    {
      name: "Rionegro",
      value: "3",
      codigoDepartamento: "1"
    },
    {
      name: "Barranquilla",
      value: "4",
      codigoDepartamento: "2"
    },
    {
      name: "Malambo",
      value: "5",
      codigoDepartamento: "2"
    },
    {
      name: "Soledad",
      value: "6",
      codigoDepartamento: "2"
    },
    {
      name: "La Dorada",
      value: "7",
      codigoDepartamento: "3"
    },
    {
      name: "Manizales",
      value: "8",
      codigoDepartamento: "3"
    },
    {
      name: "Salamina",
      value: "9",
      codigoDepartamento: "3"
    },
    {
      name: "Bogotá",
      value: "10",
      codigoDepartamento: "4"
    },
    {
      name: "Facatativá",
      value: "11",
      codigoDepartamento: "4"
    },
    {
      name: "Soacha",
      value: "12",
      codigoDepartamento: "4"
    },
    {
      name: "Bucaramanga",
      value: "13",
      codigoDepartamento: "5"
    },
    {
      name: "Floridablanca",
      value: "14",
      codigoDepartamento: "5"
    },
    {
      name: "Girón",
      value: "15",
      codigoDepartamento: "5"
    },
    {
      name: "Espinal",
      value: "16",
      codigoDepartamento: "6"
    },
    {
      name: "Ibagué",
      value: "17",
      codigoDepartamento: "6"
    },
    {
      name: "Melgar",
      value: "18",
      codigoDepartamento: "6"
    },
    {
      name: "Cali",
      value: "19",
      codigoDepartamento: "7"
    },
    {
      name: "Palmira",
      value: "20",
      codigoDepartamento: "7"
    },
    {
      name: "Tuluá",
      value: "21",
      codigoDepartamento: "7"
    }
  ];

  constructor() { }

  getListCiudades(): CiudadI[] {
    return this.listCiudades;
  }
}
