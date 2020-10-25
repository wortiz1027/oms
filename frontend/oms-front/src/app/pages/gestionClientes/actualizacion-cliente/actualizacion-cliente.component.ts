import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-actualizacion-cliente',
  templateUrl: './actualizacion-cliente.component.html',
  styles: []
})

export class ActualizacionClienteComponent implements OnInit {

  constructor() { }

  ngOnInit(){
  }

  actualizar() {
    alert('¿Seguro que quiere actualizar el cliente?');

    return;
  }

}
