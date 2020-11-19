import { Component, OnInit } from '@angular/core';
import { RequestCrearUsuarioDTO } from 'src/app/models/RequestCrearUsuarioDTO';

@Component({
  selector: 'app-busqueda-cliente',
  templateUrl: './busqueda-cliente.component.html',
  styles: []
})

export class BusquedaClienteComponent implements OnInit {

  cliente: RequestCrearUsuarioDTO;
  visibilidadDetalle:Boolean;

  constructor() { }

  ngOnInit(): void {
    this.visibilidadDetalle = false;
  }

  onRowSelect(cliente: RequestCrearUsuarioDTO) {
    this.cliente = cliente;
    this.visibilidadDetalle =true;
  }
  
  onRowUnselect(cliente: RequestCrearUsuarioDTO) {
    this.cliente = cliente;
    this.visibilidadDetalle=false;
  }


}
