import { Component, OnInit } from '@angular/core';
import { RequestCrearCampaniaDTO } from 'src/app/models/RequestCrearCampaniaDTO';
import { ResponseBuscarProductoCampaniaDTO } from 'src/app/models/ResponseBuscarProductoCampaniaDTO';

@Component({
  selector: 'app-busqueda-campania',
  templateUrl: './busqueda-campania.component.html',
  styles: []
})
export class BusquedaCampaniaComponent implements OnInit {

  campania: RequestCrearCampaniaDTO;
  visibilidadDetalle:Boolean;
  productosCampania: ResponseBuscarProductoCampaniaDTO;
  visibilidadDetalleProdsCampania: Boolean;

  constructor() { }

  ngOnInit(): void {
    this.visibilidadDetalle = false;
    this.visibilidadDetalleProdsCampania = false;
  }

  onRowSelect(campania: RequestCrearCampaniaDTO) {
    this.campania = campania;
    this.visibilidadDetalle = true;
  }
  
  onRowUnselect(campania: RequestCrearCampaniaDTO) {
    this.campania = campania;
    this.visibilidadDetalle = false;
    this.visibilidadDetalleProdsCampania = false;
  }

  onRowSelectProdCampanias(productosCampania: ResponseBuscarProductoCampaniaDTO) {
    this.productosCampania = productosCampania;
    
    this.visibilidadDetalleProdsCampania = true;
  }

}
