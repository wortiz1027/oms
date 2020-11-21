import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FileUploadComponent } from 'src/app/components/file-upload/file-upload.component';
import { RequestCrearProductoDTO } from 'src/app/models/RequestCrearProductoDTO';
import { TipoProductosI } from 'src/app/models/TipoProductos';
import { TipoProveedorI } from 'src/app/models/TipoProveedor';
import { TipoProveedorService } from 'src/app/services/comunes/tipo-proveedor.service';
import { TipoProductoService } from 'src/app/services/comunes/tipoProducto.service';

@Component({
  selector: 'app-detalle-producto-edit',
  templateUrl: './detalle-producto-edit.component.html',
  styles: [],
  providers: [TipoProveedorService, TipoProductoService]
})
export class DetalleProductoEditComponent implements OnInit {

    public listTipoProveedor: TipoProveedorI[];
    public listTipoProductos: TipoProductosI[];
    public minDate: Date;
    public maxDate: Date;
    public base64: string;
  
    urlImage: string;
  
    @Input() producto: RequestCrearProductoDTO;
    @Output() sendDetalleProducto = new EventEmitter<DetalleProductoEditComponent>();
  
    selectedNameTipoProducto: string;
    selectedValueTipoProducto: string;
  
    constructor(private formBuilder: FormBuilder, 
      private svTipoProveedor: TipoProveedorService,
      private svTipoProducto: TipoProductoService) {
        
        //Se establece la fecha minimay maxima
        const currentYear = new Date().getFullYear();
        this.minDate = new Date();
        this.maxDate = new Date(currentYear + 0, 11, 31);
    }
  
    detalleProductosForm = this.formBuilder.group({
      idProducto: ['', { validators: [Validators.required]}],
      tipoProveedor: ['', { validators: [Validators.required]}],
      tipoProducto: ['', { validators: [Validators.required]}],
      tipoProductoNV: ['', { validators: [Validators.required]}],
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
      this.listTipoProveedor = this.svTipoProveedor.getListTipoProveedor();
      this.sendDetalleProducto.emit(this);
    } 
  
    //Carga proveedores segun la seleccion de tipo proveedor
    onSelTipoProveedores(value: string): void{
      //Limpiar el campo proveedores
      this.detalleProductosForm.patchValue({tipoProducto: this.listTipoProductos});
  
      this.listTipoProductos = this.svTipoProducto.getListTipoProductos().filter(item => item.tipoProveedor == value);
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
  
        if(producto != null && producto.vendorId != null && producto.vendorId != ""){
          this.onSelTipoProveedores(producto.vendorId);
        }else{
          this.listTipoProductos = this.svTipoProducto.getListTipoProductos();
        }
        
        this.detalleProductosForm.controls['idProducto'].setValue(producto ? producto.productId ? producto.productId :"" : "");
        this.detalleProductosForm.controls['tipoProveedor'].setValue(producto ? producto.vendorId ? producto.vendorId :"" : "");
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
        
        //this.urlImage = this.detalleProductosForm.controls['imagen'].value;      
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
  