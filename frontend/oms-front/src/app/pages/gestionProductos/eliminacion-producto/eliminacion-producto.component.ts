import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eliminacion-producto',
  templateUrl: './eliminacion-producto.component.html',
  styles: []
})
export class EliminacionProductoComponent implements OnInit {

  constructor() { }

  ngOnInit(){
  }

  eliminar() {
    alert('¿Seguro que quiere eliminar el producto?');

    return;
  }

}
