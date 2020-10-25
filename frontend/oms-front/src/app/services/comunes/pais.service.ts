import { Injectable } from '@angular/core';
import { PaisI } from 'src/app/models/Pais';

@Injectable()

export class PaisService {

  private listPaises: PaisI [] = [
    {
      name: "Colombia",
      value: "1"
    }
  ];

  constructor() { }

  getListPaises(): PaisI[]{
    return this.listPaises;
  }
}
