import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { InfoOrdenI } from 'src/app/models/InfoOrden';
import { ResponseCancelOrderBPMDTO } from 'src/app/models/ResponseCancelOrderBPMDTO';
import { StatusServicesI } from 'src/app/models/StatusServices';
import { LoginService } from 'src/app/services/login/login.service';
import { ActualizarOrdenService } from 'src/app/services/orden/actualizar-orden.service';
import { CancelarOrdenBpmService } from 'src/app/services/orden/cancelar-orden-bpm.service';

@Component({
  selector: 'app-cancelar-orden',
  templateUrl: './cancelar-orden.component.html',
  styles: []
})
export class CancelarOrdenComponent implements OnInit {

  orden: InfoOrdenI;
  visibilidadDetalle: Boolean;

  responseCancelOrder: StatusServicesI;
  responseCancelOrderBPM: ResponseCancelOrderBPMDTO

  contador: number;

  @Output() sendEventUpdateTable: String;

  constructor(private svCancelarOrden: ActualizarOrdenService,
              private svCancelarOrdenBPM: CancelarOrdenBpmService,
              private svLogin: LoginService,
              private router: Router) { 

    }

  ngOnInit(): void {
    this.visibilidadDetalle = false;
    this.contador = 1;
  }

  onRowSelect(orden: InfoOrdenI) {
    this.orden = orden;
    this.visibilidadDetalle = true;
  }
  
  onRowUnselect(orden: InfoOrdenI) {
    this.orden = orden;
    this.visibilidadDetalle = false;
  }

  cancelar() {

    let idOrden = "";

    idOrden = this.orden.id;

    //Llamar servicio cancelar orden
    this.svCancelarOrden.cancelOrder(idOrden).subscribe(

      (res) => {
        this.responseCancelOrder = res;

       if(this.responseCancelOrder.status == "UPDATED"){
         
        //Llamar servicio cancelar orden bpm
        this.svCancelarOrdenBPM.cancelOrderBPM(idOrden).subscribe(

          (res) => {
            this.responseCancelOrderBPM = res;

            if(this.responseCancelOrderBPM.status.code == "SUCCESS"){
              this.contador++;
              this.sendEventUpdateTable = "ActualizarTabla" + this.contador;

              alert("Orden Cancelada !!!");
              this.svLogin.refreshToken();
              this.visibilidadDetalle = false;        
              this.router.navigate(['cancelarOrden']);  
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
  }

}