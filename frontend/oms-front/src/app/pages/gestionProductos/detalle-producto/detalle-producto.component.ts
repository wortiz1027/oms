import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TipoProductosI } from 'src/app/models/TipoProductos';
import { TipoProveedorI } from 'src/app/models/TipoProveedor';
import { TipoProveedorService } from 'src/app/services/comunes/tipo-proveedor.service';
import { RequestCrearProductoDTO } from 'src/app/models/RequestCrearProductoDTO';
import { LoginService } from 'src/app/services/login/login.service';
import { BuscarProveedorService } from 'src/app/services/proveedores/buscar-proveedor.service';
import { ResponseBuscarTipoProveedoresDTO } from 'src/app/models/ResponseBuscarTipoProveedoresDTO';
import { ResponseBuscarProveedoresDTO } from 'src/app/models/ResponseBuscarProveedoresDTO';
import { RequestCrearProveedorDTO } from 'src/app/models/RequestCrearProveedorDTO';
import { IdDescripcionI } from 'src/app/models/IdDescripcion';
import { TipoProductoService } from 'src/app/services/comunes/tipo-producto.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styles: [],
  providers: [TipoProveedorService, BuscarProveedorService]
})
export class DetalleProductoComponent implements OnInit {

  public listTipoProveedor: RequestCrearProveedorDTO[];
  public listTipoProductos: IdDescripcionI[];
  //public listTipoProductosTemp: RequestCrearProveedorDTO[];
  public minDate: Date;
  public maxDate: Date;

  urlImage: string;

  @Input() producto: RequestCrearProductoDTO;
  
  @Output() sendDetalleProducto = new EventEmitter<DetalleProductoComponent>();

  selectedNameTipoProducto: string;
  selectedValueTipoProducto: string;

  responseBuscarTipoProveedores: ResponseBuscarTipoProveedoresDTO;
  responseBuscarProveedores: ResponseBuscarProveedoresDTO;
  responseTipoProductos: ResponseBuscarTipoProveedoresDTO;

  constructor(private formBuilder: FormBuilder, 
              private svTipoProveedor: BuscarProveedorService,
              private svTipoProducto: TipoProductoService,
              private svLogin: LoginService) {
      
      //Se establece la fecha minimay maxima
      const currentYear = new Date().getFullYear();
      this.minDate = new Date();
      this.maxDate = new Date(currentYear + 0, 11, 31);
  }

  detalleProductosForm = this.formBuilder.group({
    idProducto: [''],
    tipoProveedor: ['', { validators: [Validators.required]}],
    tipoProducto: ['', { validators: [Validators.required]}],
    tipoProductoNV: [''],
    codigo: ['', { validators: [Validators.required]}],
    nombre: ['', { validators: [Validators.required]}],
    descripcion: ['', { validators: [Validators.required]}],
    precio: ['', { validators: [Validators.required]}],
    fechaInicial: [''],
    fechaFinal: [''],
    ciudadOrigen: [''],
    ciudadDestino: [''],
    imagen: [''],
    urlImagen: ['']
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

    this.sendDetalleProducto.emit(this);
  } 
/*
  //Carga proveedores segun la seleccion de tipo proveedor
  onSelTipoProveedores(value: string): void{
    //Limpiar el campo proveedores
    this.detalleProductosForm.patchValue({tipoProducto: this.listTipoProductos});

    this.listTipoProductos = this.svTipoProducto.getListTipoProductos().filter(item => item.tipoProveedor == value);
  }
*/
  //Carga proveedores segun la seleccion de tipo proveedor
  onSelTipoProveedores(value: string): void{
    //Limpiar el campo proveedores
    //this.detalleProductosForm.patchValue({tipoProducto: this.listTipoProductos});

    //this.listTipoProductos = this.listTipoProductosTemp.filter(item => item.idProvider == value);
  }

  //Se mapea el name y value del tipo de producto
  onSelTipoProducto(event): void{
    let name = event.target.options[event.target.options.selectedIndex].text;

    this.selectedNameTipoProducto = name;
    this.selectedValueTipoProducto = event.target.value;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.producto.currentValue) {

      let producto: RequestCrearProductoDTO = changes.producto.currentValue;

      this.detalleProductosForm.controls['idProducto'].setValue(producto ? producto.productId ? producto.productId :"" : "");
      this.detalleProductosForm.controls['tipoProveedor'].setValue(producto ? producto.vendor ? producto.vendor.idProvider ? producto.vendor.idProvider : "" :"" : "");
      this.detalleProductosForm.controls['tipoProducto'].setValue(producto ? producto.type ? producto.type.id ? producto.type.id : "" : "" : "");
      this.detalleProductosForm.controls['tipoProductoNV'].setValue(producto ? producto.type ? producto.type : {} : {});
      this.detalleProductosForm.controls['codigo'].setValue(producto.productCode);
      this.detalleProductosForm.controls['nombre'].setValue(producto.productName);
      this.detalleProductosForm.controls['descripcion'].setValue(producto.productDescription);
      this.detalleProductosForm.controls['precio'].setValue(producto.productPrice);
      this.detalleProductosForm.controls['fechaInicial'].setValue(producto.startDate);
      this.detalleProductosForm.controls['fechaFinal'].setValue(producto.endDate);
      this.detalleProductosForm.controls['ciudadOrigen'].setValue(producto.originCity);
      this.detalleProductosForm.controls['ciudadDestino'].setValue(producto.destinationCity);
      this.detalleProductosForm.controls['imagen'].setValue(producto ? producto.image ? producto.image :{} : {});
      this.detalleProductosForm.controls['urlImagen'].setValue(producto ? producto.image ? producto.image.url ? producto.image.url :"" : "" : {});
        
      //this.urlImage = this.detalleProductosForm.controls['urlImagen'].value;      
      this.urlImage = "https://material.angular.io/assets/img/examples/shiba2.jpg";
    }
  }

  //Metodos Para validacion de campos
  getMensajeError(field:string): string{
    let mensaje: string;
  
    if(this.detalleProductosForm.get(field).errors.required){
      mensaje = 'El campo es requerido';
    }
  
    return mensaje;
  }
  
  verificarCampo(field: string): boolean{
    return ((this.detalleProductosForm.get(field).dirty || this.detalleProductosForm.get(field).touched) && 
            (this.detalleProductosForm.get(field).invalid || this.detalleProductosForm.get(field).errors?.required));
  }

}
