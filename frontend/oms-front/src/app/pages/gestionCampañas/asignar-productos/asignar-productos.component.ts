import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProveedoresI } from 'src/app/models/Proveedores';
import { TipoProveedorI } from 'src/app/models/TipoProveedor';
import { ProveedorService } from 'src/app/services/comunes/proveedor.service';
import { TipoProveedorService } from 'src/app/services/comunes/tipo-proveedor.service';

@Component({
  selector: 'app-asignar-productos',
  templateUrl: './asignar-productos.component.html',
  styles: [],
  providers: [TipoProveedorService, ProveedorService]
})

export class AsignarProductosComponent implements OnInit {

  public listTipoProveedor: TipoProveedorI[];
  public listProveedores: ProveedoresI[];

  constructor(private formBuilder: FormBuilder, 
              private svTipoProveedor: TipoProveedorService,
              private svProveedores: ProveedorService) { 

  }

  asignarProductosForm = this.formBuilder.group({
    tipoProveedor: ['', { validators: [Validators.required]}],
    proveedores: ['', { validators: [Validators.required]}],
    producto: ['', { validators: [Validators.required]}]
  });

  ngOnInit(){
    this.listTipoProveedor = this.svTipoProveedor.getListTipoProveedor();
  }

  //Carga proveedores segun la seleccion de tipo proveedor
  onSelTipoProveedores(value: string): void{
    //Limpiar el campo proveedores
    this.asignarProductosForm.patchValue({proveedores: this.listProveedores});

    this.listProveedores = this.svProveedores.getListProveedores().filter(item => item.tipoProveedor == value);
  }

  //Metodos Para validacion de campos
  getMensajeError(field:string): string{
    let mensaje: string;
  
    if(this.asignarProductosForm.get(field).errors.required){
      mensaje = 'El campo es requerido';
    }
  
    return mensaje;
  }

  agregarProducto(){
    alert("falta jejeje");
  }
  
  verificarCampo(field: string): boolean{
    return ((this.asignarProductosForm.get(field).dirty || this.asignarProductosForm.get(field).touched) && 
            (this.asignarProductosForm.get(field).invalid || this.asignarProductosForm.get(field).errors?.required));
  } 

}
