import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-actualizacion-producto',
  templateUrl: './actualizacion-producto.component.html',
  styles: []
})
export class ActualizacionProductoComponent implements OnInit {

  constructor() {

  }  
  
  ngOnInit() {

  }

  actualizar() {
    alert('¿Seguro que quiere actualizar el producto?');

    return;
  }


}