import { Component, OnInit } from '@angular/core';
import { InfoOrdenI } from 'src/app/models/InfoOrden';

@Component({
  selector: 'app-busqueda-orden',
  templateUrl: './busqueda-orden.component.html',
  styles: []
})
export class BusquedaOrdenComponent implements OnInit {

  orden: InfoOrdenI;
  visibilidadDetalle: Boolean;

  constructor() { }

  ngOnInit(): void {
    this.visibilidadDetalle = false;
  }

  onRowSelect(orden: InfoOrdenI) {
    this.orden = orden;
    this.visibilidadDetalle = true;
  }
  
  onRowUnselect(orden: InfoOrdenI) {
    this.orden = orden;
    this.visibilidadDetalle = false;
  }

}
