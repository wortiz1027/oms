import { formatDate } from '@angular/common';
import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UUID } from 'angular2-uuid';
import { RequestBuscarProductoDTO } from 'src/app/models/RequestBuscarProductoDTO';
import { RequestCrearImagenDTO } from 'src/app/models/RequestCrearImagenDTO';
import { RequestCrearProductoDTO } from 'src/app/models/RequestCrearProductoDTO';
import { ResponseBuscarProductoDTO } from 'src/app/models/ResponseBuscarProductoDTO';
import { ResponseCrearImagenDTO } from 'src/app/models/ResponseCrearImagenDTO';
import { ResponseCrearProductDTO } from 'src/app/models/ResponseCrearProductDTO';
import { CrearImagenService } from 'src/app/services/imagenes/crear-imagen.service';
import { LoginService } from 'src/app/services/login/login.service';
import { ActualizarProductoService } from 'src/app/services/producto/actualizar-producto.service';
import { BuscarProductoService } from 'src/app/services/producto/buscar-producto.service';
import { DetalleProductoEditComponent } from '../detalle-producto-edit/detalle-producto-edit.component';

@Component({
  selector: 'app-actualizacion-producto',
  templateUrl: './actualizacion-producto.component.html',
  styles: []
})

export class ActualizacionProductoComponent implements OnInit {

  producto: RequestCrearProductoDTO;
  visibilidadDetalle:Boolean;

  formDataDetalleProducto: FormGroup;

  responseImagen: ResponseCrearImagenDTO;
  responseProducto: ResponseCrearProductDTO;

  fileBase64: string = "";
  file: File = null;

  imagen: RequestCrearImagenDTO;

  /*
  reqBuscarProducto: RequestBuscarProductoDTO;
  resBuscarProducto: ResponseBuscarProductoDTO;
  lstProductos: RequestCrearProductoDTO[];
  totalRecords: number;
  first: number = 0;

  //selectedProducto: RequestCrearProductoDTO;

  //@Output() sendListProductos = new EventEmitter<ResponseBuscarProductoDTO>();
*/
  constructor(private svActualizarProducto: ActualizarProductoService,
              private svLogin: LoginService,
              private svCrearImagen: CrearImagenService,
              private router: Router,
              private svBuscarProducto: BuscarProductoService) { 

  } 
  
  ngOnInit() {

  }

  onRowSelect(producto: RequestCrearProductoDTO) {
    this.producto = producto;
    this.visibilidadDetalle = true;
  }
  
  onRowUnselect(producto: RequestCrearProductoDTO) {
    this.producto = producto;
    this.visibilidadDetalle = false;
  }

  showFormDataDetalle(componentDetalleProducto: DetalleProductoEditComponent) { 
    this.formDataDetalleProducto = componentDetalleProducto.detalleProductosForm;
  }

  showDataFileUpload(dataFileUpload: any) {
    this.fileBase64 = dataFileUpload.fileBase64;
    this.file = dataFileUpload.file;

  }

  actualizar() {

    if (!this.formDataDetalleProducto.valid) {
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
            //Se prepara los datos del producto

            let producto: RequestCrearProductoDTO = {};
            let imagen: any = {};
            let fechaInicio: string = "";
            let fechaFin: string = "";

            imagen.id = codigoImagenUuid;
            imagen.url = "";

            fechaInicio = formatDate(this.formDataDetalleProducto.get('fechaInicial').value, 'yyyy-MM-dd', 'en-US');
            fechaFin = formatDate(this.formDataDetalleProducto.get('fechaFinal').value, 'yyyy-MM-dd', 'en-US');

            producto.productId = this.formDataDetalleProducto.get("idProducto").value;
            producto.productCode = this.formDataDetalleProducto.get("codigo").value;
            producto.productName = this.formDataDetalleProducto.get("nombre").value;
            producto.productDescription = this.formDataDetalleProducto.get("descripcion").value;
            producto.startDate = fechaInicio;
            producto.endDate = fechaFin;
            producto.productPrice = this.formDataDetalleProducto.get("precio").value;
            producto.originCity = this.formDataDetalleProducto.get("ciudadOrigen").value;
            producto.destinationCity = this.formDataDetalleProducto.get("ciudadDestino").value;
            producto.image = imagen;
            producto.vendorId = this.formDataDetalleProducto.get("tipoProveedor").value;
            producto.type = this.formDataDetalleProducto.get("tipoProductoNV").value;

            //Llamar servicio actualizar producto
            this.svActualizarProducto.updateProduct(producto).subscribe(

              (res) => {
                this.responseProducto = res;

                if(this.responseProducto.status == "UPDATED"){
                  alert("Producto Actualizado !!!");
                  this.svLogin.refreshToken();
                  this.visibilidadDetalle = false;
                  this.router.navigate(['actualizarProducto']);  
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
            
      let producto: RequestCrearProductoDTO = {};
      let fechaInicio: string = "";
      let fechaFin: string = "";

      fechaInicio = formatDate(this.formDataDetalleProducto.get('fechaInicial').value, 'yyyy-MM-dd', 'en-US');
      fechaFin = formatDate(this.formDataDetalleProducto.get('fechaFinal').value, 'yyyy-MM-dd', 'en-US');

      producto.productId = this.formDataDetalleProducto.get("idProducto").value;
      producto.productCode = this.formDataDetalleProducto.get("codigo").value;
      producto.productName = this.formDataDetalleProducto.get("nombre").value;
      producto.productDescription = this.formDataDetalleProducto.get("descripcion").value;
      producto.startDate = fechaInicio;
      producto.endDate = fechaFin;
      producto.productPrice = this.formDataDetalleProducto.get("precio").value;
      producto.originCity = this.formDataDetalleProducto.get("ciudadOrigen").value;
      producto.destinationCity = this.formDataDetalleProducto.get("ciudadDestino").value;
      producto.image = this.formDataDetalleProducto.get("imagen").value;
      producto.vendorId = this.formDataDetalleProducto.get("tipoProveedor").value;
      producto.type = this.formDataDetalleProducto.get("tipoProductoNV").value;

      //Llamar servicio actualizar producto
      this.svActualizarProducto.updateProduct(producto).subscribe(

        (res) => {
          this.responseProducto = res;

          if(this.responseProducto.status == "UPDATED"){
            alert("Producto Actualizado !!!");
            this.svLogin.refreshToken();
            this.visibilidadDetalle = false;
            this.router.navigate(['actualizarProducto']);  
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

  /*
  consultarProductos(){

    this.reqBuscarProducto = {};
    this.lstProductos = []; 
    let producto: RequestCrearProductoDTO = {};
    
    this.reqBuscarProducto.text = "";
    this.reqBuscarProducto.page = "0";
    this.reqBuscarProducto.size = "5";
    this.reqBuscarProducto.token = this.svLogin.getToken().valueOf();

    
    this.svBuscarProducto.buscarProductos(this.reqBuscarProducto).subscribe(
      (res) => {
        this.resBuscarProducto = res;

        if(this.resBuscarProducto){
          this.sendListProductos.emit(this.resBuscarProducto);
          this.svLogin.refreshToken();
        } 
      },
      (res) => {
        console.log('error ' + JSON.stringify(res.status));
      }
    );
    
  }
  */
}
