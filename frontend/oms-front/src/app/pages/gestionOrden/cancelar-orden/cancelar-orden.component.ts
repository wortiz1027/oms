import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { InfoOrdenI } from 'src/app/models/InfoOrden';
import { StatusServicesI } from 'src/app/models/StatusServices';
import { LoginService } from 'src/app/services/login/login.service';
import { ActualizarOrdenService } from 'src/app/services/orden/actualizar-orden.service';

@Component({
  selector: 'app-cancelar-orden',
  templateUrl: './cancelar-orden.component.html',
  styles: []
})
export class CancelarOrdenComponent implements OnInit {

  orden: InfoOrdenI;
  visibilidadDetalle: Boolean;

  responseCancelOrder: StatusServicesI;

  contador: number;

  @Output() sendEventUpdateTable: String;

  constructor(private svCancelarOrden: ActualizarOrdenService,
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

}