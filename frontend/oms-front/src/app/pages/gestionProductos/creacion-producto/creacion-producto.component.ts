import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TipoProductosI } from 'src/app/models/TipoProductos';
import { TipoProveedorI } from 'src/app/models/TipoProveedor';

import{ FileUploadComponent} from 'src/app/components/file-upload/file-upload.component'
import { TipoProveedorService } from 'src/app/services/comunes/tipo-proveedor.service';

import { RequestCrearProductoDTO } from 'src/app/models/RequestCrearProductoDTO';
import { RequestCrearImagenDTO } from 'src/app/models/RequestCrearImagenDTO';

import { UUID } from 'angular2-uuid';
import { CrearImagenService } from 'src/app/services/imagenes/crear-imagen.service';
import { ResponseCrearImagenDTO } from 'src/app/models/ResponseCrearImagenDTO';
import { TipoProductoI } from 'src/app/models/TipoProducto';
import { CrearProductoService } from 'src/app/services/producto/crear-producto.service';
import { ResponseCrearProductDTO } from 'src/app/models/ResponseCrearProductDTO';
import { Router } from '@angular/router';
import { TipoProductoService } from 'src/app/services/comunes/tipoProducto.service';
import { formatDate } from '@angular/common';
import { LoginService } from 'src/app/services/login/login.service';


@Component({
  selector: 'app-creacion-producto',
  templateUrl: './creacion-producto.component.html',
  styles: [],
  providers: [TipoProveedorService, TipoProductoService]
})

export class CreacionProductoComponent implements OnInit {

  public listTipoProveedor: TipoProveedorI[];
  public listTipoProductos: TipoProductosI[];
  public minDate: Date;
  public maxDate: Date;
  public base64: string;
  producto: RequestCrearProductoDTO;
  imagen: RequestCrearImagenDTO;

  responseImagen: ResponseCrearImagenDTO;
  responseProducto: ResponseCrearProductDTO;

  selectedNameTipoProducto: string;
  selectedValueTipoProducto: string;

  @ViewChild(FileUploadComponent) fileUpload;

    constructor(private formBuilder: FormBuilder, 
                private svTipoProveedor: TipoProveedorService,
                private svTipoProducto: TipoProductoService,
                private svCrearImagen: CrearImagenService,
                private svCrearProducto: CrearProductoService,
                private svLogin: LoginService,
                private router: Router) {
                  
                  //Se establece la fecha minima y maxima
                  const currentYear = new Date().getFullYear();
                  this.minDate = new Date();
                  this.maxDate = new Date(currentYear + 0, 11, 31);
    }
             
    registerProductosForm = this.formBuilder.group({
      tipoProveedor: ['', { validators: [Validators.required]}],
      tipoProducto: ['', { validators: [Validators.required]}],
      codigo: ['', { validators: [Validators.required]}],
      nombre: ['', { validators: [Validators.required]}],
      descripcion: ['', { validators: [Validators.required]}],
      precio: ['', { validators: [Validators.required]}],
      fechaInicial: ['', { validators: [Validators.required]}],
      fechaFinal: ['', { validators: [Validators.required]}],
      ciudadOrigen: [''],
      ciudadDestino: ['']
    });
  
    ngOnInit() {
      this.listTipoProveedor = this.svTipoProveedor.getListTipoProveedor();
  
    }
  
    crearProducto() {
     
      if (!this.registerProductosForm.valid) {
        alert('Alguna regla de validación no se está cumpliendo');
  
        return;
      }

      this.imagen = {};
      this.imagen.metadata = {};

      let typeImagen;
      typeImagen = this.fileUpload.file.type.split('/', this.fileUpload.file.type.length);

      let codigoImagenUuid = UUID.UUID();

      this.imagen.metadata.id = codigoImagenUuid
      this.imagen.metadata.name = this.fileUpload.file.name;
      this.imagen.metadata.size = this.fileUpload.file.size;
      this.imagen.metadata.type = typeImagen[1];

      this.imagen.image = this.fileUpload.fileBase64;

      this.svCrearImagen.createImage(this.imagen).subscribe(
        (res) => {
          this.responseImagen = res;
  
          if(this.responseImagen.status == "CREATED"){
            //Se prepara los datos del producto
            this.producto = {};
            let codigoProductoUuid = UUID.UUID();
            let tipoProducto: TipoProductoI = {};
            let imagen: any = {};
            let fechaInicio: string = "";
            let fechaFin: string = "";

            tipoProducto.id = this.selectedValueTipoProducto;
            tipoProducto.description = this.selectedNameTipoProducto;

            imagen.id = codigoImagenUuid;
            imagen.url = "";

            fechaInicio = formatDate(this.registerProductosForm.get('fechaInicial').value, 'yyyy-MM-dd', 'en-US');
            fechaFin = formatDate(this.registerProductosForm.get('fechaFinal').value, 'yyyy-MM-dd', 'en-US');

            this.producto.productId = codigoProductoUuid;
            this.producto.productCode = this.registerProductosForm.get('codigo').value;
            this.producto.productName = this.registerProductosForm.get('nombre').value;
            this.producto.productDescription = this.registerProductosForm.get('descripcion').value;
            this.producto.startDate = fechaInicio;
            this.producto.endDate = fechaFin;
            this.producto.type = tipoProducto;
            this.producto.productPrice = this.registerProductosForm.get('precio').value;
            this.producto.originCity = this.registerProductosForm.get('ciudadOrigen').value;
            this.producto.destinationCity = this.registerProductosForm.get('ciudadDestino').value;
            this.producto.image = imagen;
            this.producto.vendorId = this.registerProductosForm.get('tipoProveedor').value;

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
          }
        },
        (res) => {
          if(res.status == 401){
            this.svLogin.userLogout();
          }
          console.log('error ' + JSON.stringify(res.status));
        }
      ); 

      this.producto = {};

    }
  
    limpiar() {
      this.registerProductosForm.patchValue({
        tipoProveedor: '',
        tipoProducto: '',
        codigo: '',
        nombre: '',
        descripcion: '',
        precio: '',
        fechaInicial: '',
        fechaFinal: '',
        ciudadOrigen: '',
        ciudadDestino: ''
      });
    }

    //Carga proveedores segun la seleccion de tipo proveedor
    onSelTipoProveedores(value: string): void{
      //Limpiar el campo proveedores
      this.registerProductosForm.patchValue({tipoProducto: this.listTipoProductos});

      this.listTipoProductos = this.svTipoProducto.getListTipoProductos().filter(item => item.tipoProveedor == value);
    }

    //Se mapea el name y vakue del tipo de producto
    onSelTipoProducto(event): void{

      let name = event.target.options[event.target.options.selectedIndex].text;

      this.selectedNameTipoProducto = name;
      this.selectedValueTipoProducto = event.target.value;
    }
  
    //Metodos Para validacion de campos
    getMensajeError(field:string): string{
      let mensaje: string;
    
      if(this.registerProductosForm.get(field).errors.required){
        mensaje = 'El campo es requerido';
      }
    
      return mensaje;
    }
    
    verificarCampo(field: string): boolean{
      return ((this.registerProductosForm.get(field).dirty || this.registerProductosForm.get(field).touched) && 
              (this.registerProductosForm.get(field).invalid || this.registerProductosForm.get(field).errors?.required));
    }   
}
