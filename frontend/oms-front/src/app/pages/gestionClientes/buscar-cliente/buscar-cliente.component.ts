import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-buscar-cliente',
  templateUrl: './buscar-cliente.component.html',
  styles: []
})
export class BuscarClienteComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['position', 'identificacion', 'nombres', 'apellidos'];

  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private formBuilder: FormBuilder) {

  }

  busquedaClientesForm = this.formBuilder.group({
    busquedaCliente: ['', { validators: [Validators.required]}]
  });

  ngOnInit(){
  }

  buscar() {
    if (!this.busquedaClientesForm.valid) {
      alert('Alguna regla de validación no se está cumpliendo');

      return;
    }
  }

  refrescar() {
    this.busquedaClientesForm.patchValue({
      busquedaCliente: ''
    });
  }

  //Metodos Para validacion de campos
  getMensajeError(field:string): string{
    let mensaje: string;
  
    if(this.busquedaClientesForm.get(field).errors.required){
      mensaje = 'El campo es requerido';
    }
  
    return mensaje;
  }
  
  verificarCampo(field: string): boolean{
    return ((this.busquedaClientesForm.get(field).dirty || this.busquedaClientesForm.get(field).touched) && 
            (this.busquedaClientesForm.get(field).invalid || this.busquedaClientesForm.get(field).errors?.required));
  }

}

export interface PeriodicElement {
  position: number;
  identificacion: string;
  nombres: string;
  apellidos: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, identificacion: '1-001', nombres: 'Juan', apellidos: 'Quintero'},
  {position: 2, identificacion: '1-002', nombres: 'Santiago', apellidos: 'Arias'},
  {position: 3, identificacion: '1-003', nombres: 'Jhon', apellidos: 'Celemin'},
  {position: 4, identificacion: '1-004', nombres: 'Marta', apellidos: 'Gomez'},
  {position: 5, identificacion: '1-005', nombres: 'Andrea', apellidos: 'Serna'},
  {position: 6, identificacion: '2-001', nombres: 'Willman', apellidos: 'Ortiz'},
  {position: 7, identificacion: '2-002', nombres: 'Brian', apellidos: 'Suarez'},
  {position: 8, identificacion: '2-003', nombres: 'Eduardo', apellidos: 'Franco'},
  {position: 9, identificacion: '2-004', nombres: 'Jorge', apellidos: 'Adams'},
  {position: 10, identificacion: '3-001', nombres: 'Julio', apellidos: 'Jaramillo'}
];

