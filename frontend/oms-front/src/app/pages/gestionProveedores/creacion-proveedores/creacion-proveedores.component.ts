import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CiudadI } from 'src/app/models/Ciudad';
import { DepartamentoI } from 'src/app/models/Departamento';
import { PaisI } from 'src/app/models/Pais';
import { TipoProveedorI } from 'src/app/models/TipoProveedor';
import { CiudadService } from 'src/app/services/comunes/ciudad.service';
import { DepartamentoService } from 'src/app/services/comunes/departamento.service';
import { PaisService } from 'src/app/services/comunes/pais.service';
import { TipoProveedorService } from 'src/app/services/comunes/tipo-proveedor.service';

@Component({
  selector: 'app-creacion-proveedores',
  templateUrl: './creacion-proveedores.component.html',
  styles: [],
  providers: [TipoProveedorService, PaisService, DepartamentoService, CiudadService]
})
export class CreacionProveedoresComponent implements OnInit {

  private emailValido = "^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$";
  public listTipoProveedor: TipoProveedorI[];
  public listPaises: PaisI[];
  public listDepartamentos: DepartamentoI[];
  public listCiudades: CiudadI[];

  constructor(private formBuilder: FormBuilder,
              private svTipoProveedor : TipoProveedorService,
              private svPaises : PaisService,
              private svDepartamentos : DepartamentoService,
              private svCiudades : CiudadService) { }
   
  registerProveedoresForm = this.formBuilder.group({
    nombre: ['', { validators: [Validators.required]}],
    nit: ['', { validators: [Validators.required]}],
    tipoProveedor: ['', { validators: [Validators.required]}],
    direccion: ['', { validators: [Validators.required]}],
    pais: ['', { validators: [Validators.required]}],
    departamento: ['', { validators: [Validators.required]}],
    ciudad: ['', { validators: [Validators.required]}],
    telefono: ['', { validators: [Validators.required]}],
    email: ['', { validators: [Validators.required, Validators.pattern(this.emailValido)]}]
  });
  
  ngOnInit() {
    this.listTipoProveedor = this.svTipoProveedor.getListTipoProveedor();
    this.listPaises = this.svPaises.getListPaises();
    this.listDepartamentos = this.svDepartamentos.getListDepartamentos();
    this.listCiudades = this.svCiudades.getListCiudades();
  }
  
    submit() {
  
      if (!this.registerProveedoresForm.valid) {
        alert('Alguna regla de validación no se está cumpliendo');
  
        return;
      }
      console.log(this.registerProveedoresForm.value);
    }
  
    refrescar() {
      this.registerProveedoresForm.patchValue({
        nombre: '',
        nit: '',
        tipoProveedor: '',
        direccion: '',
        pais: '',
        departamento: '',
        ciudad: '',
        telefono: '',
        email: ''
      });
  
    }

    //Carga departamentos segun la seleccion de pais
    onSelPais(value: string): void{
      //Limpiar el campo departamentos
      this.registerProveedoresForm.patchValue({departamento: this.listDepartamentos});

      this.listDepartamentos = this.svDepartamentos.getListDepartamentos().filter(item => item.codigoPais == value);
    }

    //Carga ciudades segun la seleccion de departamento
    onSelDepartamento(value: string): void{
      //Limpiar el campo ciudades
      this.registerProveedoresForm.patchValue({ciudad: this.listCiudades});

      this.listCiudades = this.svCiudades.getListCiudades().filter(item => item.codigoDepartamento == value);
    }
  
    //Metodos Para validacion de campos 
    getMensajeError(field:string): string{
      let mensaje: string;
            
      if(this.registerProveedoresForm.get(field).errors.required){
        mensaje = 'El campo es requerido';
      }else if(this.registerProveedoresForm.get(field).hasError('pattern')){
        mensaje = 'Ingrese un email valido';
      }
    
      return mensaje;
    }
    
    verificarCampo(field: string): boolean{
      return ((this.registerProveedoresForm.get(field).dirty || this.registerProveedoresForm.get(field).touched) && 
          (this.registerProveedoresForm.get(field).invalid || this.registerProveedoresForm.get(field).errors?.required));
    }
  
  }
