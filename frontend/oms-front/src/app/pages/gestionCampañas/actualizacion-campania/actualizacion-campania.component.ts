import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UUID } from 'angular2-uuid';
import { RequestCrearCampaniaDTO } from 'src/app/models/RequestCrearCampaniaDTO';
import { RequestCrearImagenDTO } from 'src/app/models/RequestCrearImagenDTO';
import { ResponseCrearCampaniaDTO } from 'src/app/models/ResponseCrearCampaniaDTO';
import { ResponseCrearImagenDTO } from 'src/app/models/ResponseCrearImagenDTO';
import { ActualizarCampaniaService } from 'src/app/services/campania/actualizar-campania.service';
import { CrearImagenService } from 'src/app/services/imagenes/crear-imagen.service';
import { LoginService } from 'src/app/services/login/login.service';
import { DetalleCampaniaEditComponent } from '../detalle-campania-edit/detalle-campania-edit.component';

@Component({
  selector: 'app-actualizacion-campania',
  templateUrl: './actualizacion-campania.component.html',
  styles: []
})
export class ActualizacionCampaniaComponent implements OnInit {

  campania: RequestCrearCampaniaDTO;
  visibilidadDetalle:Boolean;

  formDataDetalleCampania: FormGroup;

  responseImagen: ResponseCrearImagenDTO;
  responseCampania: ResponseCrearCampaniaDTO;

  fileBase64: string = "";
  file: File = null;

  imagen: RequestCrearImagenDTO;

  constructor(private svActualizarCampania: ActualizarCampaniaService,
    private svLogin: LoginService,
    private svCrearImagen: CrearImagenService,
    private router: Router) { 

  }

  ngOnInit(){

  }

  onRowSelect(campania: RequestCrearCampaniaDTO) {
    this.campania = campania;
    this.visibilidadDetalle = true;
  }
  
  onRowUnselect(campania: RequestCrearCampaniaDTO) {
    this.campania = campania;
    this.visibilidadDetalle = false;
  }

  showFormDataDetalle(componentDetalleCampania: DetalleCampaniaEditComponent) { 
    this.formDataDetalleCampania = componentDetalleCampania.detalleCampaniasForm;
  }

  showDataFileUpload(dataFileUpload: any) {
    this.fileBase64 = dataFileUpload.fileBase64;
    this.file = dataFileUpload.file;

  }

  actualizar() {
    if (!this.formDataDetalleCampania.valid) {
      alert('Alguna regla de validación no se está cumpliendo');

      return;
    }

    if(this.file != null && this.fileBase64 != ""){
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
            let campania: RequestCrearCampaniaDTO = {};
            let imagen: any = {};
            let fechaInicio: string = "";
            let fechaFin: string = "";

            imagen.id = codigoImagenUuid;
            imagen.url = "";

            fechaInicio = formatDate(this.formDataDetalleCampania.get('fechaInicial').value, 'yyyy-MM-dd', 'en-US');
            fechaFin = formatDate(this.formDataDetalleCampania.get('fechaFinal').value, 'yyyy-MM-dd', 'en-US');

            campania.campaignId = this.formDataDetalleCampania.get("idCampania").value;
            campania.campaignCode = this.formDataDetalleCampania.get("codigo").value;
            campania.campaignName = this.formDataDetalleCampania.get("nombre").value;
            campania.campaignDescription = this.formDataDetalleCampania.get("descripcion").value;
            campania.startDate = fechaInicio;
            campania.endDate = fechaFin;
            campania.discount = this.formDataDetalleCampania.get("descuento").value;
            campania.status = this.formDataDetalleCampania.get("status").value;
            campania.action = this.formDataDetalleCampania.get("action").value;
            campania.image = imagen;
            campania.action = "UPDATED";

            //Llamar servicio actualizar campaña
            this.svActualizarCampania.updateCampaign(campania).subscribe(

              (res) => {
                this.responseCampania = res;

                if(this.responseCampania.status == "UPDATED"){
                  alert("Campaña Actualizada !!!");
                  this.svLogin.refreshToken();
                  this.router.navigate(['actualizarCampania']);  
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
    }else{
      //Se prepara los datos del producto
            
      let campania: RequestCrearCampaniaDTO = {};
      let fechaInicio: string = "";
      let fechaFin: string = "";

      fechaInicio = formatDate(this.formDataDetalleCampania.get('fechaInicial').value, 'yyyy-MM-dd', 'en-US');
      fechaFin = formatDate(this.formDataDetalleCampania.get('fechaFinal').value, 'yyyy-MM-dd', 'en-US');

      campania.campaignId = this.formDataDetalleCampania.get("idCampania").value;
      campania.campaignCode = this.formDataDetalleCampania.get("codigo").value;
      campania.campaignName = this.formDataDetalleCampania.get("nombre").value;
      campania.campaignDescription = this.formDataDetalleCampania.get("descripcion").value;
      campania.startDate = fechaInicio;
      campania.endDate = fechaFin;
      campania.discount = this.formDataDetalleCampania.get("descuento").value;
      campania.status = this.formDataDetalleCampania.get("status").value;
      campania.action = this.formDataDetalleCampania.get("action").value;
      campania.image = this.formDataDetalleCampania.get("imagen").value;
      campania.action = "UPDATED";

      //Llamar servicio actualizar producto
      this.svActualizarCampania.updateCampaign(campania).subscribe(

        (res) => {
          this.responseCampania = res;

          if(this.responseCampania.status == "UPDATED"){
            alert("Campaña Actualizada !!!");
            this.svLogin.refreshToken();
            this.router.navigate(['actualizarCampania']);  
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

    return;
  }

}
