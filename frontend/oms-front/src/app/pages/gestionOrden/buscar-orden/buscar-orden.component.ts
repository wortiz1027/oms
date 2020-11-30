import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Paginator } from 'primeng/paginator';
import { InfoOrdenI } from 'src/app/models/InfoOrden';
import { RequestBuscarOrdenDTO } from 'src/app/models/RequestBuscarOrdenDTO';
import { ResponseBuscarOrdenDTO } from 'src/app/models/ResponseBuscarOrdenDTO';
import { LoginService } from 'src/app/services/login/login.service';
import { BuscarOrdenService } from 'src/app/services/orden/buscar-orden.service';

@Component({
  selector: 'app-buscar-orden',
  templateUrl: './buscar-orden.component.html',
  styles: []
})
export class BuscarOrdenComponent implements OnInit {

  reqBuscarOrden: RequestBuscarOrdenDTO;
  resBuscarOrden: ResponseBuscarOrdenDTO;

  lstOrdenes: InfoOrdenI[];
  totalRecords: number;
  first: number = 0;

  selectedOrden: InfoOrdenI;

  @Input() sendEventUpdateTable: String;

  @Output() sendOrdenSelect = new EventEmitter<InfoOrdenI>();
  @Output() sendOrdenUnSelect = new EventEmitter<InfoOrdenI>();

  @ViewChild('paginator', { static: true }) paginator: Paginator;

  constructor(private formBuilder: FormBuilder,
              private svBuscarOrden: BuscarOrdenService,
              private svLogin: LoginService
            ) {

  }

  busquedaOrdenesForm = this.formBuilder.group({
    busquedaOrden: ['']
  });
  
  ngOnInit() {
    this.lstOrdenes = []; 
  }
  
  buscar() {
    this.reqBuscarOrden = {};
    this.lstOrdenes = []; 
    let orden: InfoOrdenI = {};
    
    this.reqBuscarOrden.text = this.busquedaOrdenesForm.get('busquedaOrden').value;
    this.reqBuscarOrden.page = "0";
    this.reqBuscarOrden.size = "5";

    if(this.reqBuscarOrden.text != null && this.reqBuscarOrden.text.trim() != ""){
      this.svBuscarOrden.buscarOrdenText(this.reqBuscarOrden).subscribe(
        (res) => {
          this.resBuscarOrden = res;

          if(this.resBuscarOrden.status.code == "SUCCESS"){
            if(this.resBuscarOrden.order != null){
              orden = {};
              
              orden.id = this.resBuscarOrden.order.id;
              orden.code = this.resBuscarOrden.order.code;
              orden.creationDate = this.resBuscarOrden.order.creationDate;
              orden.customer = this.resBuscarOrden.order.customer;
              orden.payment = this.resBuscarOrden.order.payment;
              orden.products = this.resBuscarOrden.order.products; 
              orden.state = this.resBuscarOrden.order.state;
              orden.total = this.resBuscarOrden.order.total;

              this.lstOrdenes.push(orden);

              this.totalRecords = 1;
              
            }
            this.svLogin.refreshToken();

            this.limpiar();
          }else {
            alert(this.resBuscarOrden.status.description);

            this.limpiar();
          }
        },
        (res) => {
          this.selectedOrden = {};

          this.sendOrdenUnSelect.emit(this.selectedOrden);
          
          if(res.status == 401){
            this.svLogin.userLogout();
          }else if(res.error.status.code == "ERROR"){
            alert("No se encontró ninguna orden con ese codigo");
          }
        }
      );
    }else{
      this.svBuscarOrden.buscarOrdenes(this.reqBuscarOrden).subscribe(
        (res) => {
          this.resBuscarOrden = res;

          if(this.resBuscarOrden.data.orders != null && this.resBuscarOrden.data.orders.length > 0){
            for(let i= 0; i < this.resBuscarOrden.data.orders.length; i++){
              orden = {};

              orden.id = this.resBuscarOrden.data.orders[i].id;
              orden.code = this.resBuscarOrden.data.orders[i].code;
              orden.creationDate = this.resBuscarOrden.data.orders[i].creationDate;
              orden.customer = this.resBuscarOrden.data.orders[i].customer;
              orden.payment = this.resBuscarOrden.data.orders[i].payment;
              orden.products = this.resBuscarOrden.data.orders[i].products; 
              orden.state = this.resBuscarOrden.data.orders[i].state;
              orden.total = this.resBuscarOrden.data.orders[i].total;

              this.lstOrdenes.push(orden);

              this.totalRecords = this.resBuscarOrden.data.totalItems;
              
            }
          }
          this.svLogin.refreshToken();
        },
        (res) => {
          this.selectedOrden = {};

          this.sendOrdenUnSelect.emit(this.selectedOrden);

          if(res.status == 401){
            this.svLogin.userLogout();
          }
          console.log('error ' + JSON.stringify(res.status));
        }
      );
    }
  }

  limpiar() {
    this.busquedaOrdenesForm.patchValue({
      busquedaOrden: ''
    });
  }

  paginate(event) {

    this.first = event.first;
    this.reqBuscarOrden = {};
    this.lstOrdenes = []; 
    let orden: InfoOrdenI = {};
    
    this.reqBuscarOrden.text = this.busquedaOrdenesForm.get('busquedaOrden').value;
    this.reqBuscarOrden.page = String(event.page == 0 ? 0 : event.page);
    this.reqBuscarOrden.size = "5";

    if(this.reqBuscarOrden.text != null && this.reqBuscarOrden.text.trim() != ""){
      this.svBuscarOrden.buscarOrdenText(this.reqBuscarOrden).subscribe(
        (res) => {
          this.resBuscarOrden = res;

          if(this.resBuscarOrden.status.code == "SUCCESS"){
            if(this.resBuscarOrden.order != null){
              orden = {};
              
              orden.id = this.resBuscarOrden.order.id;
              orden.code = this.resBuscarOrden.order.code;
              orden.creationDate = this.resBuscarOrden.order.creationDate;
              orden.customer = this.resBuscarOrden.order.customer;
              orden.payment = this.resBuscarOrden.order.payment;
              orden.products = this.resBuscarOrden.order.products; 
              orden.state = this.resBuscarOrden.order.state;
              orden.total = this.resBuscarOrden.order.total;

              this.lstOrdenes.push(orden);

              this.totalRecords = 1;
              
            }
            this.svLogin.refreshToken();

            this.limpiar();
          }else {
            alert(this.resBuscarOrden.status.description);

            this.limpiar();
          }
        },
        (res) => {
          this.selectedOrden = {};

          this.sendOrdenUnSelect.emit(this.selectedOrden);
          
          if(res.status == 401){
            this.svLogin.userLogout();
          }else if(res.error.status.code == "ERROR"){
            alert("No se encontró ninguna orden con ese codigo");
          }
        }
      );
    }else{
      this.svBuscarOrden.buscarOrdenes(this.reqBuscarOrden).subscribe(
        (res) => {
          this.resBuscarOrden = res;

          if(this.resBuscarOrden.data.orders != null && this.resBuscarOrden.data.orders.length > 0){
            for(let i= 0; i < this.resBuscarOrden.data.orders.length; i++){
              orden = {};

              orden.id = this.resBuscarOrden.data.orders[i].id;
              orden.code = this.resBuscarOrden.data.orders[i].code;
              orden.creationDate = this.resBuscarOrden.data.orders[i].creationDate;
              orden.customer = this.resBuscarOrden.data.orders[i].customer;
              orden.payment = this.resBuscarOrden.data.orders[i].payment;
              orden.products = this.resBuscarOrden.data.orders[i].products; 
              orden.state = this.resBuscarOrden.data.orders[i].state;
              orden.total = this.resBuscarOrden.data.orders[i].total;

              this.lstOrdenes.push(orden);

              this.totalRecords = this.resBuscarOrden.data.totalItems;
              
            }
          }
          this.svLogin.refreshToken();
        },
        (res) => {
          this.selectedOrden = {};

          this.sendOrdenUnSelect.emit(this.selectedOrden);

          if(res.status == 401){
            this.svLogin.userLogout();
          }
          console.log('error ' + JSON.stringify(res.status));
        }
      );
    }
    
  }

  onRowSelect(event) {
    
    let idOrden = this.selectedOrden.id;

    if((idOrden != null && idOrden != "")){
      this.selectedOrden = {};

      this.svBuscarOrden.buscarDetalleOrder(idOrden).subscribe(
        (res) => {
          this.resBuscarOrden = res;

          if(this.resBuscarOrden.status.code == "SUCCESS"){
              this.selectedOrden.id = this.resBuscarOrden.order.id;
              this.selectedOrden.code = this.resBuscarOrden.order.code;
              this.selectedOrden.creationDate = this.resBuscarOrden.order.creationDate;
              this.selectedOrden.customer = this.resBuscarOrden.order.customer;
              this.selectedOrden.payment = this.resBuscarOrden.order.payment;
              this.selectedOrden.products = this.resBuscarOrden.order.products; 
              this.selectedOrden.state = this.resBuscarOrden.order.state;
              this.selectedOrden.total = this.resBuscarOrden.order.total;

          }

          this.sendOrdenSelect.emit(this.selectedOrden);

          this.svLogin.refreshToken();
        },
        (res) => {
          this.selectedOrden = {};

          this.sendOrdenUnSelect.emit(this.selectedOrden);

          if(res.status == 401){
            this.svLogin.userLogout();
          }
          console.log('error ' + JSON.stringify(res.status));
        }
      );

    }
    
  }

  onRowUnselect(event) {
    this.selectedOrden = {};

    this.sendOrdenUnSelect.emit(this.selectedOrden);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.sendEventUpdateTable.currentValue) {

      this.reqBuscarOrden = {};
      this.lstOrdenes = []; 
      let orden: InfoOrdenI = {};
      
      this.reqBuscarOrden.text = "";
      this.reqBuscarOrden.page = "0";
      this.reqBuscarOrden.size = "5";

      this.svBuscarOrden.buscarOrdenes(this.reqBuscarOrden).subscribe(
        (res) => {
          this.resBuscarOrden = res;

          if(this.resBuscarOrden.data.orders != null && this.resBuscarOrden.data.orders.length > 0){
            for(let i= 0; i < this.resBuscarOrden.data.orders.length; i++){
              orden = {};

              orden.id = this.resBuscarOrden.data.orders[i].id;
              orden.code = this.resBuscarOrden.data.orders[i].code;
              orden.creationDate = this.resBuscarOrden.data.orders[i].creationDate;
              orden.customer = this.resBuscarOrden.data.orders[i].customer;
              orden.payment = this.resBuscarOrden.data.orders[i].payment;
              orden.products = this.resBuscarOrden.data.orders[i].products; 
              orden.state = this.resBuscarOrden.data.orders[i].state;
              orden.total = this.resBuscarOrden.data.orders[i].total;

              this.lstOrdenes.push(orden);

              this.totalRecords = this.resBuscarOrden.data.totalItems;
              
            }
          }
          this.svLogin.refreshToken();
        },
        (res) => {
          this.selectedOrden = {};

          this.sendOrdenUnSelect.emit(this.selectedOrden);

          if(res.status == 401){
            this.svLogin.userLogout();
          }
          console.log('error ' + JSON.stringify(res.status));
        }
      );

    }
  }

}