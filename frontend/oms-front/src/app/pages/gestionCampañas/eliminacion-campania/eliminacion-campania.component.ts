import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eliminacion-campania',
  templateUrl: './eliminacion-campania.component.html',
  styles: []
})
export class EliminacionCampaniaComponent implements OnInit {

  constructor() { }

  ngOnInit(){

  }

  eliminar() {
    alert('¿Seguro que quiere eliminar la campaña?');

    return;
  }

}
