import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-buscar-producto',
  templateUrl: './buscar-producto.component.html'
})

export class BuscarProductoComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['position', 'codProducto', 'name', 'descripcion'];

  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private formBuilder: FormBuilder) {

  }
        
  busquedaProductosForm = this.formBuilder.group({
    busquedaProducto: ['', { validators: [Validators.required]}]
  });
  
  ngOnInit() {

  }
  
  buscar() {
    if (!this.busquedaProductosForm.valid) {
      alert('Alguna regla de validación no se está cumpliendo');

      return;
    }
  }

  refrescar() {
    this.busquedaProductosForm.patchValue({
      busquedaProducto: ''
    });
  }

  //Metodos Para validacion de campos
  getMensajeError(field:string): string{
    let mensaje: string;
  
    if(this.busquedaProductosForm.get(field).errors.required){
      mensaje = 'El campo es requerido';
    }
  
    return mensaje;
  }
  
  verificarCampo(field: string): boolean{
    return ((this.busquedaProductosForm.get(field).dirty || this.busquedaProductosForm.get(field).touched) && 
            (this.busquedaProductosForm.get(field).invalid || this.busquedaProductosForm.get(field).errors?.required));
  }

}

export interface PeriodicElement {
  position: number;
  codProducto: string;
  name: string;
  descripcion: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, codProducto: '1-001', name: 'Hydrogen', descripcion: 'Descripcion producto 1'},
  {position: 2, codProducto: '1-002', name: 'Helium', descripcion: 'Descripcion producto 2'},
  {position: 3, codProducto: '1-003', name: 'Lithium', descripcion: 'Descripcion producto 3'},
  {position: 4, codProducto: '1-004', name: 'Beryllium', descripcion: 'Descripcion producto 4'},
  {position: 5, codProducto: '1-005', name: 'Boron', descripcion: 'Descripcion producto 5'},
  {position: 6, codProducto: '2-001', name: 'Carbon', descripcion: 'Descripcion producto 6'},
  {position: 7, codProducto: '2-002', name: 'Neon', descripcion: 'Descripcion producto 7'},
  {position: 8, codProducto: '2-003', name: 'Sodium', descripcion: 'Descripcion producto 8'},
  {position: 9, codProducto: '2-004', name: 'Aluminum', descripcion: 'Descripcion producto 9'},
  {position: 10, codProducto: '3-001', name: 'Magnesium', descripcion: 'Descripcion producto 10'}
];