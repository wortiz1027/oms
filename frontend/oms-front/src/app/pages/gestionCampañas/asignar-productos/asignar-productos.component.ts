import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UUID } from 'angular2-uuid';
import { AgregarProductoI } from 'src/app/models/AgregarProducto';
import { RequestAgregarProductoDTO } from 'src/app/models/RequestAgregarProductoDTO';
import { RequestCrearCampaniaDTO } from 'src/app/models/RequestCrearCampaniaDTO';
import { RequestCrearProductoDTO } from 'src/app/models/RequestCrearProductoDTO';
import { ResponseAgregarProductoDTO } from 'src/app/models/ResponseAgregarProductoDTO';
import { AgregarProductService } from 'src/app/services/campania/agregar-product.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-asignar-productos',
  templateUrl: './asignar-productos.component.html',
  styles: []
})

export class AsignarProductosComponent implements OnInit {

  campania: RequestCrearCampaniaDTO;
  visibilidadBuscarProductos:Boolean;
  visibilidadBotonAgregar:Boolean;

  selectedProductos: RequestCrearProductoDTO[];

  reqAgregarProducto: RequestAgregarProductoDTO;
  resAgregarProducto: ResponseAgregarProductoDTO; 

  constructor(private formBuilder: FormBuilder,
              private svAgregarProductoCampaña: AgregarProductService,
              private svLogin: LoginService,
              private router: Router) { 

  }

  ngOnInit(): void {
    this.visibilidadBuscarProductos = false;
    this.reqAgregarProducto = {};
  }

  onRowSelectCampania(campania: RequestCrearCampaniaDTO) {
    this.campania = campania;
    this.visibilidadBuscarProductos = true;
  }
  
  onRowUnselectCampania(campania: RequestCrearCampaniaDTO) {
    this.campania = campania;
    this.visibilidadBuscarProductos = false;
  }

  onRowSelectProducts(productos: RequestCrearProductoDTO[]) {
    this.selectedProductos = productos;

    this.visibilidadBotonAgregar = true;
  }
  
  agregarProducto(){
    if(this.selectedProductos && this.selectedProductos.length > 0){
      this.reqAgregarProducto.products = [];
      let agregarProducto: AgregarProductoI;

      for(var i = 0; i < this.selectedProductos.length; i++){
        agregarProducto = {};
        
        let idCampaniaProducto = UUID.UUID();

        agregarProducto.campaignProductId = idCampaniaProducto
        agregarProducto.campaignId = this.campania.campaignId
        agregarProducto.productId = this.selectedProductos[i].productId;
        agregarProducto.action = "CREATED";

        this.reqAgregarProducto.products.push(agregarProducto);
      }

      if(this.reqAgregarProducto != null && this.reqAgregarProducto.products != null && this.reqAgregarProducto.products.length > 0){

        //Llamar servicio crear campaña
        this.svAgregarProductoCampaña.addProductCampaign(this.reqAgregarProducto).subscribe(
          (res) => {
            this.resAgregarProducto = res;
    
            if(this.resAgregarProducto.status.status == "SUCCESS"){
              alert("Productos Agregados !!!");
              this.svLogin.refreshToken();
              this.visibilidadBotonAgregar = false;
              this.visibilidadBuscarProductos = false;
              this.router.navigate(['asignarProductos']);  
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
  }

}
