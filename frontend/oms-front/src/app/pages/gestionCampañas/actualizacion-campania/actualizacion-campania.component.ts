import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-actualizacion-campania',
  templateUrl: './actualizacion-campania.component.html',
  styles: []
})
export class ActualizacionCampaniaComponent implements OnInit {

  constructor() { }

  ngOnInit(){

  }

  actualizar() {
    alert('¿Seguro que quiere actualizar la campaña?');

    return;
  }

}
