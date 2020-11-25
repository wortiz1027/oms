import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { ResponseCrearCampaniaDTO } from 'src/app/models/ResponseCrearCampaniaDTO';
import { RequestCrearCampaniaDTO } from 'src/app/models/RequestCrearCampaniaDTO';
import { RequestCrearImagenDTO } from 'src/app/models/RequestCrearImagenDTO';
import { CrearImagenService } from 'src/app/services/imagenes/crear-imagen.service';
import { CrearCampaniaService } from 'src/app/services/campania/crear-campania.service';
import { LoginService } from 'src/app/services/login/login.service';
import { UUID } from 'angular2-uuid';
import { ResponseCrearImagenDTO } from 'src/app/models/ResponseCrearImagenDTO';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-creacion-campania',
  templateUrl: './creacion-campania.component.html',
  styles: []
})
export class CreacionCampaniaComponent implements OnInit {
  public minDate: Date;
  public maxDate: Date;
  public base64: string;

  visibilidadBotonCrear: Boolean = false;

  campania: RequestCrearCampaniaDTO;
  imagen: RequestCrearImagenDTO;

  responseImagen: ResponseCrearImagenDTO;
  responseCampania: ResponseCrearCampaniaDTO;

  fileBase64: string = "";
  file: File = null;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private svCrearImagen: CrearImagenService,
              private svCrearCampania: CrearCampaniaService,
              private svLogin: LoginService) {

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
    status: ['', { validators: [Validators.required]}]
  });

  ngOnInit(){

  }

  showDataFileUpload(dataFileUpload: any) {
    this.fileBase64 = dataFileUpload.fileBase64;
    this.file = dataFileUpload.file;

    this.visibilidadBotonCrear = true;
  }

  asignarProductos(){
    this.router.navigate(['asignarProductos']);
  }

  crearCampania() {  

    if (!this.registerCampaniasForm.valid) {
      alert('Alguna regla de validación no se está cumpliendo');

      return;
    }

    this.imagen = {};
    this.imagen.metadata = {};

    let typeImagen;

    typeImagen = this.file.type.split('/', this.file.type.length);

    let codigoImagenUuid = UUID.UUID();

    this.imagen.metadata.id = codigoImagenUuid
    this.imagen.metadata.name = this.file.name;
    this.imagen.metadata.size = this.file.size;
    this.imagen.metadata.type = typeImagen[1];

    this.imagen.image = this.fileBase64;
        
    this.svCrearImagen.createImage(this.imagen).subscribe(
      (res) => {
        this.responseImagen = res;

        if(this.responseImagen.status == "CREATED"){
          //Se prepara los datos de la campaña
          this.campania = {};
          let codigoCampaniaUuid = UUID.UUID();
          let imagen: any = {};
          let fechaInicio: string = "";
          let fechaFin: string = "";

          imagen.id = codigoImagenUuid;
          imagen.url = "";

          fechaInicio = formatDate(this.registerCampaniasForm.get('fechaInicial').value, 'yyyy-MM-dd', 'en-US');
          fechaFin = formatDate(this.registerCampaniasForm.get('fechaFinal').value, 'yyyy-MM-dd', 'en-US');

          this.campania.campaignId = codigoCampaniaUuid;
          this.campania.campaignCode = this.registerCampaniasForm.get('codigo').value;
          this.campania.campaignName = this.registerCampaniasForm.get('nombre').value;
          this.campania.campaignDescription = this.registerCampaniasForm.get('descripcion').value;
          this.campania.startDate = fechaInicio
          this.campania.endDate = fechaFin
          this.campania.discount = this.registerCampaniasForm.get('descuento').value;
          this.campania.image = imagen;
          this.campania.status = this.registerCampaniasForm.get('status').value;
          this.campania.action = "CREATED";
          
          //Llamar servicio crear campaña
          this.svCrearCampania.createCampaign(this.campania).subscribe(
            (res) => {
              this.responseCampania = res;
      
              if(this.responseCampania.status == "CREATED"){
                alert("Campaña Creada !!!");
                this.limpiar();
                this.svLogin.refreshToken();
                this.visibilidadBotonCrear = false;
                this.router.navigate(['crearCampania']);  
              } 
            },
            (res) => {
              if(res.status == 401){
                this.svLogin.userLogout();
              }
              console.log('error ' + JSON.stringify(res.status));
            }
          );
        }
      },
      (res) => {
        if(res.status == 401){
          this.svLogin.userLogout();
        }
        console.log('error ' + JSON.stringify(res.status));
      }
    ); 

    this.campania = {};

  }

  limpiar() {
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
