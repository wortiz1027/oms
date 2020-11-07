import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FileUploadComponent } from 'src/app/components/file-upload/file-upload.component';
import { CampaniaDTO } from 'src/app/models/CampaniaDTO';
import {Router} from '@angular/router';

@Component({
  selector: 'app-creacion-campania',
  templateUrl: './creacion-campania.component.html',
  styles: []
})
export class CreacionCampaniaComponent implements OnInit {
  public minDate: Date;
  public maxDate: Date;
  public base64: string;
  campania: CampaniaDTO;

  @ViewChild(FileUploadComponent) fileUpload;

  constructor(private formBuilder: FormBuilder,
              private router: Router) {

              //Se establece la fecha minima y maxima
              const currentYear = new Date().getFullYear();
              this.minDate = new Date();
              this.maxDate = new Date(currentYear + 0, 11, 31);
  
  }

  registerCampaniasForm = this.formBuilder.group({
    codigo: ['', { validators: [Validators.required]}],
    nombre: ['', { validators: [Validators.required]}],
    descripcion: ['', { validators: [Validators.required]}],
    fechaInicial: ['', { validators: [Validators.required]}],
    fechaFinal: ['', { validators: [Validators.required]}],
    descuento: ['', { validators: [Validators.required]}],
    activa: ['', { validators: [Validators.required]}]
  });

  ngOnInit(){

  }

  asignarProductos(){
    this.router.navigate(['asignarProductos']);
  }

  crearCampania() {    
    if (!this.registerCampaniasForm.valid) {
      alert('Alguna regla de validación no se está cumpliendo');

      return;
    }
    
    this.campania.codigo = this.registerCampaniasForm.get('codigo').value;
    this.campania.nombre = this.registerCampaniasForm.get('nombre').value;
    this.campania.descripcion = this.registerCampaniasForm.get('descripcion').value;
    this.campania.fechaInicial = this.registerCampaniasForm.get('fechaInicial').value;
    this.campania.fechaFinal = this.registerCampaniasForm.get('fechaFinal').value;
    this.campania.descuento = this.registerCampaniasForm.get('descuento').value;
    
    console.log(this.registerCampaniasForm.value);
    console.log(this.fileUpload.imageURL);
    //let imagenBase64:string; 

    //imagenBase64 = this.fileUpload.fileUploadForm as string;
    //let temBase64: string[];
    //verificar luego
    //temBase64 = imagenBase64.split('data:image/jpeg;base64,');
    //this.base64 = temBase64[1];  
  }

  refrescar() {
    this.registerCampaniasForm.patchValue({
      codigo: '',
      nombre: '',
      descripcion: '',
      fechaInicial: '',
      fechaFinal: '',
      descuento: '',
      activa: ''
    });
  }

  //Metodos Para validacion de campos
  getMensajeError(field:string): string{
    let mensaje: string;
  
    if(this.registerCampaniasForm.get(field).errors.required){
      mensaje = 'El campo es requerido';
    }
  
    return mensaje;
  }
  
  verificarCampo(field: string): boolean{
    return ((this.registerCampaniasForm.get(field).dirty || this.registerCampaniasForm.get(field).touched) && 
            (this.registerCampaniasForm.get(field).invalid || this.registerCampaniasForm.get(field).errors?.required));
  }

  
}
