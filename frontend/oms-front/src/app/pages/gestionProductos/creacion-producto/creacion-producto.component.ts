import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TipoProveedorService } from 'src/app/services/comunes/tipo-proveedor.service';

import { RequestCrearProductoDTO } from 'src/app/models/RequestCrearProductoDTO';
import { RequestCrearImagenDTO } from 'src/app/models/RequestCrearImagenDTO';

import { UUID } from 'angular2-uuid';
import { CrearImagenService } from 'src/app/services/imagenes/crear-imagen.service';
import { ResponseCrearImagenDTO } from 'src/app/models/ResponseCrearImagenDTO';
import { CrearProductoService } from 'src/app/services/producto/crear-producto.service';
import { ResponseCrearProductDTO } from 'src/app/models/ResponseCrearProductDTO';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { LoginService } from 'src/app/services/login/login.service';
import { IdDescripcionI } from 'src/app/models/IdDescripcion';
import { ResponseBuscarTipoProveedoresDTO } from 'src/app/models/ResponseBuscarTipoProveedoresDTO';
import { BuscarProveedorService } from 'src/app/services/proveedores/buscar-proveedor.service';
import { RequestCrearProveedorDTO } from 'src/app/models/RequestCrearProveedorDTO';
import { ResponseBuscarProveedoresDTO } from 'src/app/models/ResponseBuscarProveedoresDTO';
import { TipoProductoService } from 'src/app/services/comunes/tipo-producto.service';


@Component({
  selector: 'app-creacion-producto',
  templateUrl: './creacion-producto.component.html',
  styles: [],
  providers: [TipoProveedorService, BuscarProveedorService]
})

export class CreacionProductoComponent implements OnInit {

  public listTipoProveedor: RequestCrearProveedorDTO[];
  public listTipoProductos: IdDescripcionI[];
  //public listTipoProductosTemp: RequestCrearProveedorDTO[];
  public minDate: Date;
  public maxDate: Date;

  producto: RequestCrearProductoDTO;
  imagen: RequestCrearImagenDTO;

  responseImagen: ResponseCrearImagenDTO;
  responseProducto: ResponseCrearProductDTO;

  selectedNameTipoProducto: string;
  selectedValueTipoProducto: string;

  visibilidadBotonCrear: Boolean = false;

  fileBase64: string = "";
  file: File = null;

  responseBuscarTipoProveedores: ResponseBuscarTipoProveedoresDTO;
  responseBuscarProveedores: ResponseBuscarProveedoresDTO;
  responseTipoProductos: ResponseBuscarTipoProveedoresDTO;

  constructor(private formBuilder: FormBuilder, 
              private svTipoProveedor: BuscarProveedorService,
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
    //Llamar servicio buscar proveedores
    this.svTipoProveedor.buscarProveedores().subscribe(
      (res) => {
        this.responseBuscarProveedores = res;

        if(this.responseBuscarProveedores.status.code == "SUCCESS"){
          this.listTipoProveedor = this.responseBuscarProveedores.vendors;
        } 
      },
      (res) => {
        if(res.status == 401){
          this.svLogin.userLogout();
        }
        console.log('error ' + JSON.stringify(res.status));
      }
    );

    //Llamar servicio buscar tipo producto
    this.svTipoProducto.buscarTipoProductos().subscribe(
      (res) => {
        this.responseTipoProductos = res;

        if(this.responseTipoProductos.status.code == "SUCCESS"){
          this.listTipoProductos = this.responseTipoProductos.types;
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

    showDataFileUpload(dataFileUpload: any) {
      this.fileBase64 = dataFileUpload.fileBase64;
      this.file = dataFileUpload.file;
  
      this.visibilidadBotonCrear = true;
    }
  
    crearProducto() {
     
      if (!this.registerProductosForm.valid) {
        alert('Alguna regla de validaci??n no se est?? cumpliendo');
  
        return;
      }

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
            this.producto = {};
            let codigoProductoUuid = UUID.UUID();
            let tipoProducto: IdDescripcionI = {};
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
                  this.visibilidadBotonCrear = false;
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
      //this.registerProductosForm.patchValue({tipoProducto: this.listTipoProductos});

      //this.listTipoProductos = this.listTipoProductosTemp.filter(item => item.types.idType == value);
    }

    //Se mapea el name y value del tipo de producto
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
