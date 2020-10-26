import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-buscar-campania',
  templateUrl: './buscar-campania.component.html',
  styles: []
})
export class BuscarCampaniaComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['position', 'codProducto', 'name', 'descripcion'];

  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private formBuilder: FormBuilder) {
  
  }

  busquedaCampaniasForm = this.formBuilder.group({
    busquedaCampania: ['', { validators: [Validators.required]}]
  });
  
  ngOnInit() {

  }
  
  buscar() {
    if (!this.busquedaCampaniasForm.valid) {
      alert('Alguna regla de validación no se está cumpliendo');

      return;
    }
  }

  refrescar() {
    this.busquedaCampaniasForm.patchValue({
      busquedaCampania: ''
    });
  }

  //Metodos Para validacion de campos
  getMensajeError(field:string): string{
    let mensaje: string;
  
    if(this.busquedaCampaniasForm.get(field).errors.required){
      mensaje = 'El campo es requerido';
    }
  
    return mensaje;
  }
  
  verificarCampo(field: string): boolean{
    return ((this.busquedaCampaniasForm.get(field).dirty || this.busquedaCampaniasForm.get(field).touched) && 
            (this.busquedaCampaniasForm.get(field).invalid || this.busquedaCampaniasForm.get(field).errors?.required));
  }

}

export interface PeriodicElement {
  position: number;
  codCampania: string;
  name: string;
  descripcion: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, codCampania: '1-001', name: 'Campaña 1', descripcion: 'Descripcion campaña 1'},
  {position: 2, codCampania: '1-002', name: 'Campaña 2', descripcion: 'Descripcion campaña 2'},
  {position: 3, codCampania: '1-003', name: 'Campaña 3', descripcion: 'Descripcion campaña 3'},
  {position: 4, codCampania: '1-004', name: 'Campaña 4', descripcion: 'Descripcion campaña 4'},
  {position: 5, codCampania: '1-005', name: 'Campaña 5', descripcion: 'Descripcion campaña 5'},
  {position: 6, codCampania: '2-001', name: 'Campaña 6', descripcion: 'Descripcion campaña 6'},
  {position: 7, codCampania: '2-002', name: 'Campaña 7', descripcion: 'Descripcion campaña 7'},
  {position: 8, codCampania: '2-003', name: 'Campaña 8', descripcion: 'Descripcion campaña 8'},
  {position: 9, codCampania: '2-004', name: 'Campaña 9', descripcion: 'Descripcion campaña 9'},
  {position: 10, codCampania: '3-001', name: 'Campaña 10', descripcion: 'Descripcion campaña 10'}
];
