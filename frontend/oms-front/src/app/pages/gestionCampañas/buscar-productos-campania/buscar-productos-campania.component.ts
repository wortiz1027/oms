import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Paginator } from 'primeng/paginator';
import { RequestBuscarProductoDTO } from 'src/app/models/RequestBuscarProductoDTO';
import { RequestCrearProductoDTO } from 'src/app/models/RequestCrearProductoDTO';
import { ResponseBuscarProductoDTO } from 'src/app/models/ResponseBuscarProductoDTO';
import { LoginService } from 'src/app/services/login/login.service';
import { BuscarProductoService } from 'src/app/services/producto/buscar-producto.service';

@Component({
  selector: 'app-buscar-productos-campania',
  templateUrl: './buscar-productos-campania.component.html',
  styles: []
})
export class BuscarProductosCampaniaComponent implements OnInit {
  
    reqBuscarProducto: RequestBuscarProductoDTO;
    resBuscarProducto: ResponseBuscarProductoDTO;
    lstProductos: RequestCrearProductoDTO[];
    totalRecords: number;
    first: number = 0;
  
    @Output() sendProductosSelects = new EventEmitter<RequestCrearProductoDTO[]>();
    @Output() sendProductsUnSelects = new EventEmitter<RequestCrearProductoDTO[]>();
  
    selectedProductos: RequestCrearProductoDTO[];
  
    @ViewChild('paginator', { static: true }) paginator: Paginator;
  
    constructor(private formBuilder: FormBuilder,
                private svBuscarProducto: BuscarProductoService,
                private svLogin: LoginService
              ) {
  
    }
          
    busquedaProductosForm = this.formBuilder.group({
      busquedaProducto: ['']
    });
    
    ngOnInit() {
      this.lstProductos = []; 
    }
    
    buscar() {
      this.reqBuscarProducto = {};
      this.lstProductos = []; 
      let producto: RequestCrearProductoDTO = {};
      
      this.reqBuscarProducto.text = this.busquedaProductosForm.get('busquedaProducto').value;
      this.reqBuscarProducto.page = "0";
      this.reqBuscarProducto.size = "5";
      this.reqBuscarProducto.token = this.svLogin.getToken().valueOf();
  
      if(this.reqBuscarProducto.text != null && this.reqBuscarProducto.text.trim() != ""){
        this.svBuscarProducto.buscarProductoText(this.reqBuscarProducto).subscribe(
          (res) => {
            this.resBuscarProducto = res;
  
            if(this.resBuscarProducto.status.code == "SUCCESS"){
              if(this.resBuscarProducto.data.products != null && this.resBuscarProducto.data.products.length > 0){
                for(let i= 0; i < this.resBuscarProducto.data.products.length; i++){
                  producto = {};
    
                  producto.productId = this.resBuscarProducto.data.products[i].productId;
                  producto.productCode = this.resBuscarProducto.data.products[i].productCode;
                  producto.productName = this.resBuscarProducto.data.products[i].productName;
                  producto.productDescription = this.resBuscarProducto.data.products[i].productDescription;
                  producto.productPrice = this.resBuscarProducto.data.products[i].productPrice;
                  producto.originCity = this.resBuscarProducto.data.products[i].originCity;
                  producto.destinationCity = this.resBuscarProducto.data.products[i].destinationCity;
                  producto.startDate = this.resBuscarProducto.data.products[i].startDate;
                  producto.endDate = this.resBuscarProducto.data.products[i].endDate;
                  producto.type = this.resBuscarProducto.data.products[i].type;
                  producto.image = this.resBuscarProducto.data.products[i].image;
                  producto.vendorId = this.resBuscarProducto.data.products[i].vendorId;           
    
                  this.lstProductos.push(producto);
    
                  this.totalRecords = this.resBuscarProducto.data.totalItems;
                }
              }
              this.svLogin.refreshToken();
  
              this.limpiar();
            }else {
              alert(this.resBuscarProducto.status.description);
  
              this.limpiar();
            }
          },
          (res) => {
            this.selectedProductos = [];
  
            this.sendProductsUnSelects.emit(this.selectedProductos);
            
            if(res.status == 401){
              this.svLogin.userLogout();
            }else if(res.error.status.code == "ERROR"){
              alert("No se encontró ningún producto con ese texto");
            }
          }
        );
      }else{
        this.svBuscarProducto.buscarProductos(this.reqBuscarProducto).subscribe(
          (res) => {
            this.resBuscarProducto = res;
  
            if(this.resBuscarProducto.data.products != null && this.resBuscarProducto.data.products.length > 0){
              for(let i= 0; i < this.resBuscarProducto.data.products.length; i++){
                producto = {};
  
                producto.productId = this.resBuscarProducto.data.products[i].productId;
                producto.productCode = this.resBuscarProducto.data.products[i].productCode;
                producto.productName = this.resBuscarProducto.data.products[i].productName;
                producto.productDescription = this.resBuscarProducto.data.products[i].productDescription;
                producto.productPrice = this.resBuscarProducto.data.products[i].productPrice;
                producto.originCity = this.resBuscarProducto.data.products[i].originCity;
                producto.destinationCity = this.resBuscarProducto.data.products[i].destinationCity;
                producto.startDate = this.resBuscarProducto.data.products[i].startDate;
                producto.endDate = this.resBuscarProducto.data.products[i].endDate;
                producto.type = this.resBuscarProducto.data.products[i].type;
                producto.image = this.resBuscarProducto.data.products[i].image;
                producto.vendorId = this.resBuscarProducto.data.products[i].vendorId;           
  
                this.lstProductos.push(producto);
  
                this.totalRecords = this.resBuscarProducto.data.totalItems;
              }
            }
            this.svLogin.refreshToken();
          },
          (res) => {
            this.selectedProductos = [];
  
            this.sendProductsUnSelects.emit(this.selectedProductos);
  
            if(res.status == 401){
              this.svLogin.userLogout();
            }
            console.log('error ' + JSON.stringify(res.status));
          }
        );
      }
  
    }
  
    limpiar() {
      this.busquedaProductosForm.patchValue({
        busquedaProducto: ''
      });
    }
  
    paginate(event) {
      this.first = event.first;
  
      this.reqBuscarProducto = {};
      this.lstProductos = []; 
      let producto: RequestCrearProductoDTO = {};
      
      this.reqBuscarProducto.text = this.busquedaProductosForm.get('busquedaProducto').value;
      this.reqBuscarProducto.page = String(event.page == 0 ? 0 : event.page);
      this.reqBuscarProducto.size = "5";
      this.reqBuscarProducto.token = this.svLogin.getToken().valueOf();
  
      if(this.reqBuscarProducto.text != null && this.reqBuscarProducto.text.trim() != ""){
        this.svBuscarProducto.buscarProductoText(this.reqBuscarProducto).subscribe(
          (res) => {
            this.resBuscarProducto = res;
  
            if(this.resBuscarProducto.status.code == "SUCCESS"){
              if(this.resBuscarProducto.data.products != null && this.resBuscarProducto.data.products.length > 0){
                for(let i= 0; i < this.resBuscarProducto.data.products.length; i++){
                  producto = {};
    
                  producto.productId = this.resBuscarProducto.data.products[i].productId;
                  producto.productCode = this.resBuscarProducto.data.products[i].productCode;
                  producto.productName = this.resBuscarProducto.data.products[i].productName;
                  producto.productDescription = this.resBuscarProducto.data.products[i].productDescription;
                  producto.productPrice = this.resBuscarProducto.data.products[i].productPrice;
                  producto.originCity = this.resBuscarProducto.data.products[i].originCity;
                  producto.destinationCity = this.resBuscarProducto.data.products[i].destinationCity;
                  producto.startDate = this.resBuscarProducto.data.products[i].startDate;
                  producto.endDate = this.resBuscarProducto.data.products[i].endDate;
                  producto.type = this.resBuscarProducto.data.products[i].type;
                  producto.image = this.resBuscarProducto.data.products[i].image;
                  producto.vendorId = this.resBuscarProducto.data.products[i].vendorId;           
    
                  this.lstProductos.push(producto);
    
                  this.totalRecords = this.resBuscarProducto.data.totalItems;
                }
              }
              this.svLogin.refreshToken();
  
              this.limpiar();
            }else {
              alert(this.resBuscarProducto.status.description);
  
              this.limpiar();
            }
          },
          (res) => {
            this.selectedProductos = [];
  
            this.sendProductsUnSelects.emit(this.selectedProductos);
  
            if(res.status == 401){
              this.svLogin.userLogout();
            }
            console.log('error ' + JSON.stringify(res.status));
          }
        );
      }else{
        this.svBuscarProducto.buscarProductos(this.reqBuscarProducto).subscribe(
          (res) => {
            this.resBuscarProducto = res;
  
            if(this.resBuscarProducto.data.products != null && this.resBuscarProducto.data.products.length > 0){
              for(let i= 0; i < this.resBuscarProducto.data.products.length; i++){
                producto = {};
  
                producto.productId = this.resBuscarProducto.data.products[i].productId;
                producto.productCode = this.resBuscarProducto.data.products[i].productCode;
                producto.productName = this.resBuscarProducto.data.products[i].productName;
                producto.productDescription = this.resBuscarProducto.data.products[i].productDescription;
                producto.productPrice = this.resBuscarProducto.data.products[i].productPrice;
                producto.originCity = this.resBuscarProducto.data.products[i].originCity;
                producto.destinationCity = this.resBuscarProducto.data.products[i].destinationCity;
                producto.startDate = this.resBuscarProducto.data.products[i].startDate;
                producto.endDate = this.resBuscarProducto.data.products[i].endDate;
                producto.type = this.resBuscarProducto.data.products[i].type;
                producto.image = this.resBuscarProducto.data.products[i].image;
                producto.vendorId = this.resBuscarProducto.data.products[i].vendorId;           
  
                this.lstProductos.push(producto);
  
                this.totalRecords = this.resBuscarProducto.data.totalItems;
              }
            }
            this.svLogin.refreshToken();
          },
          (res) => {
            this.selectedProductos = [];
  
            this.sendProductsUnSelects.emit(this.selectedProductos);
  
            if(res.status == 401){
              this.svLogin.userLogout();
            }
            console.log('error ' + JSON.stringify(res.status));
          }
        );
      }
  
    }
  
    onRowSelect(event) {
      this.sendProductosSelects.emit(this.selectedProductos);
    }
  
  }
  
