import { Component, OnInit } from '@angular/core';
import { RequestCrearProductoDTO } from 'src/app/models/RequestCrearProductoDTO';

@Component({
  selector: 'app-busqueda-producto',
  templateUrl: './busqueda-producto.component.html',
  styles: []
})
export class BusquedaProductoComponent implements OnInit {

  producto: RequestCrearProductoDTO;
  visibilidadDetalle:Boolean;

  constructor() { }

  ngOnInit(): void {
    this.visibilidadDetalle = false;
  }

  onRowSelect(producto: RequestCrearProductoDTO) {
    this.producto = producto;
    this.visibilidadDetalle = true;
  }
  
  onRowUnselect(producto: RequestCrearProductoDTO) {
    this.producto = producto;
    this.visibilidadDetalle = false;
  }

}
