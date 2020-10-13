import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProveedoresI } from 'src/app/models/Proveedores';
import { TipoProveedorI } from 'src/app/models/TipoProveedor';

import{FileUploadComponent} from 'src/app/components/file-upload/file-upload.component'
import { TipoProveedorService } from 'src/app/services/comunes/tipo-proveedor.service';
import { ProveedorService } from 'src/app/services/comunes/proveedor.service';


@Component({
  selector: 'app-creacion-producto',
  templateUrl: './creacion-producto.component.html',
  styles: [],
  providers: [TipoProveedorService, ProveedorService]
})

export class CreacionProductoComponent implements OnInit {

  public listTipoProveedor: TipoProveedorI[];
  public listProveedores: ProveedoresI[];
  public minDate: Date;
  public maxDate: Date;
  public base64: string;
  @ViewChild(FileUploadComponent) fileUpload;

    constructor(private formBuilder: FormBuilder, 
                private svTipoProveedor: TipoProveedorService,
                private svProveedores: ProveedorService) {
                  
                  //Se establece la fecha minimay maxima
                  const currentYear = new Date().getFullYear();
                  this.minDate = new Date();
                  this.maxDate = new Date(currentYear + 0, 11, 31);
    }
             
    registerProductosForm = this.formBuilder.group({
      tipoProveedor: ['', { validators: [Validators.required]}],
      proveedores: ['', { validators: [Validators.required]}],
      codigo: ['', { validators: [Validators.required]}],
      nombre: ['', { validators: [Validators.required]}],
      descripcion: ['', { validators: [Validators.required]}],
      precio: ['', { validators: [Validators.required]}],
      fechaInicial: [''],
      fechaFinal: [''],
      ciudadOrigen: [''],
      ciudadDestino: [''],
      urlImagen: ['']
    });
  
    ngOnInit() {
      this.listTipoProveedor = this.svTipoProveedor.getListTipoProveedor();
  
    }
  
    submit() {
      
      if (!this.registerProductosForm.valid) {
        alert('Alguna regla de validación no se está cumpliendo');
  
        return;
      }
      
      console.log(this.registerProductosForm.value);
      //let imagenBase64:string; 

      //imagenBase64 = this.fileUpload.fileUploadForm as string;
      //let temBase64: string[];
      //verificar luego
      //temBase64 = imagenBase64.split('data:image/jpeg;base64,');
      //this.base64 = temBase64[1];  
    }
  
    refrescar() {
      this.registerProductosForm.patchValue({
        tipoProveedor: '',
        proveedores: '',
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
      this.registerProductosForm.patchValue({proveedores: this.listProveedores});

      this.listProveedores = this.svProveedores.getListProveedores().filter(item => item.tipoProveedor == value);
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
