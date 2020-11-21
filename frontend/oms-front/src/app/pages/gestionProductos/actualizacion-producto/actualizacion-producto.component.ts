import { formatDate } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UUID } from 'angular2-uuid';
import { FileUploadComponent } from 'src/app/components/file-upload/file-upload.component';
import { RequestCrearImagenDTO } from 'src/app/models/RequestCrearImagenDTO';
import { RequestCrearProductoDTO } from 'src/app/models/RequestCrearProductoDTO';
import { ResponseCrearImagenDTO } from 'src/app/models/ResponseCrearImagenDTO';
import { ResponseCrearProductDTO } from 'src/app/models/ResponseCrearProductDTO';
import { ResponseCrearProductoDTO } from 'src/app/models/ResponseCrearProductoDTO';
import { CrearImagenService } from 'src/app/services/imagenes/crear-imagen.service';
import { LoginService } from 'src/app/services/login/login.service';
import { ActualizarProductoService } from 'src/app/services/producto/actualizar-producto.service';
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
  router: any;

  fileBase64: string = "";
  file: File = null;

  imagen: RequestCrearImagenDTO;

  constructor(private svActualizarProducto: ActualizarProductoService,
              private svLogin: LoginService,
              private svCrearImagen: CrearImagenService) { 

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

    console.log("this.formDataDetalleProducto " + JSON.stringify(this.formDataDetalleProducto.value));

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
            console.log("se creo imagen");

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

            console.log("producto actualizar " + JSON.stringify(producto));

            //Llamar servicio actualizar producto
            this.svActualizarProducto.updateProduct(producto).subscribe(

              (res) => {
                this.responseProducto = res;

                console.log("this.responseProducto " + JSON.stringify(this.responseProducto));
                /*
                if(this.responseProducto.status == "SUCCESS"){
                  alert("Usuario Actualizado !!!");
                  this.svLogin.refreshToken();
                  this.router.navigate(['actualizarCliente']);  
                } 
                */
              },
              (res) => {
                if(res.status == 401){
                  this.svLogin.userLogout();
                }
                console.log('error ' + JSON.stringify(res.status));
              }
            );
/*
            //Llamar servicio crear doc
            this.svCrearProducto.createProduct(this.producto).subscribe(
              (res) => {
                this.responseProducto = res;
        
                if(this.responseProducto.status == "CREATED"){
                  alert("Producto Creado !!!");
                  this.limpiar();
                  this.svLogin.refreshToken();
                  this.router.navigate(['crearProducto']);  
                } 
              },
              (res) => {
                if(res.status == 401){
                  this.svLogin.userLogout();
                }
                console.log('error ' + JSON.stringify(res.status));
              }
            );
            */
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

/*
    this.svActualizarProducto.updateProduct(this.producto).subscribe(

      (res) => {
        this.responseService = res;

        if(this.responseService.status.code == "SUCCESS"){
          alert("Usuario Actualizado !!!");
          this.svLogin.refreshToken();
          this.router.navigate(['actualizarCliente']);  
        } 
      },
      (res) => {
        if(res.status == 401){
          this.svLogin.userLogout();
        }
        console.log('error ' + JSON.stringify(res.status));
      }
    ); 
    */
    
    return;
  }


}