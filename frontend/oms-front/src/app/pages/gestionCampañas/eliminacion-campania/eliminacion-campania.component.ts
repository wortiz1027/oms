import { formatDate } from '@angular/common';
import { Component, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestCrearCampaniaDTO } from 'src/app/models/RequestCrearCampaniaDTO';
import { ResponseCrearCampaniaDTO } from 'src/app/models/ResponseCrearCampaniaDTO';
import { EliminarCampaniaService } from 'src/app/services/campania/eliminar-campania.service';
import { LoginService } from 'src/app/services/login/login.service';
import { DetalleCampaniaComponent } from '../detalle-campania/detalle-campania.component';

@Component({
  selector: 'app-eliminacion-campania',
  templateUrl: './eliminacion-campania.component.html',
  styles: []
})
export class EliminacionCampaniaComponent implements OnInit {

  campania: RequestCrearCampaniaDTO;
  visibilidadDetalle: Boolean;
  contador: number;

  formDataDetalleCampania: FormGroup;

  responseDeleteCampania: ResponseCrearCampaniaDTO;

  @Output() sendEventUpdateTable: String;

  constructor(private svEliminarCampania: EliminarCampaniaService,
              private svLogin: LoginService,
              private router: Router) { 

  } 

  ngOnInit(){
    this.contador = 1;
  }

  onRowSelect(campania: RequestCrearCampaniaDTO) {
    this.campania = campania;
    this.visibilidadDetalle = true;
  }
  
  onRowUnselect(campania: RequestCrearCampaniaDTO) {
    this.campania = campania;
    this.visibilidadDetalle = false;
  }

  showFormDataDetalle(componentDetalleCampania: DetalleCampaniaComponent) { 
    this.formDataDetalleCampania = componentDetalleCampania.detalleCampaniasForm;
  }

  eliminar() {
    //Se prepara los datos de la campaña
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
    campania.image = this.formDataDetalleCampania.get("imagen").value;
    campania.action = "DELETED";

    //Llamar servicio eliminar campaña
    this.svEliminarCampania.deleteCampaign(campania).subscribe(
      (res) => {
        this.responseDeleteCampania = res;

       if(this.responseDeleteCampania.status == "DELETED"){
        this.contador++;
        this.sendEventUpdateTable = "ActualizarTabla" + this.contador;
        
        alert("Campaña Eliminada !!!");
        this.svLogin.refreshToken();
        this.visibilidadDetalle = false;
        this.router.navigate(['eliminarCampania']);  
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

}
