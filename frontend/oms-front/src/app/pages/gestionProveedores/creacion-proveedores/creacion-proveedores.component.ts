import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UUID } from 'angular2-uuid';
import { CiudadI } from 'src/app/models/Ciudad';
import { DepartamentoI } from 'src/app/models/Departamento';
import { IdDescripcionI } from 'src/app/models/IdDescripcion';
import { PaisI } from 'src/app/models/Pais';
import { RequestCrearProveedorDTO } from 'src/app/models/RequestCrearProveedorDTO';
import { ResponseBuscarTipoProveedoresDTO } from 'src/app/models/ResponseBuscarTipoProveedoresDTO';
import { StatusServicesI } from 'src/app/models/StatusServices';
import { TipoProveedorI } from 'src/app/models/TipoProveedor';
import { CiudadService } from 'src/app/services/comunes/ciudad.service';
import { DepartamentoService } from 'src/app/services/comunes/departamento.service';
import { PaisService } from 'src/app/services/comunes/pais.service';
import { TipoProveedorService } from 'src/app/services/comunes/tipo-proveedor.service';
import { LoginService } from 'src/app/services/login/login.service';
import { CrearProveedorService } from 'src/app/services/proveedores/crear-proveedor.service';

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
  proveedor: RequestCrearProveedorDTO;

  responseBuscarProveedores: ResponseBuscarTipoProveedoresDTO;

  selectedNameTipoProveedor: string;
  selectedValueTipoProveedor: string;
  visibilidadDepartamento: Boolean;
  visibilidadCiudad: Boolean;

  responseCrearProveedor: StatusServicesI;

  constructor(private formBuilder: FormBuilder,
              private svTipoProveedor : TipoProveedorService,
              private svPaises : PaisService,
              private svDepartamentos : DepartamentoService,
              private svCiudades : CiudadService,
              private svLogin: LoginService,
              private svCrearProveedor: CrearProveedorService,
              private router: Router) { }
   
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
    //Llamar servicio buscar tipo proveedores
    this.svTipoProveedor.buscarTipoProveedores().subscribe(
      (res) => {
        this.responseBuscarProveedores = res;

        if(this.responseBuscarProveedores.status.code == "SUCCESS"){
          this.listTipoProveedor = this.responseBuscarProveedores.types;
        } 
      },
      (res) => {
        if(res.status == 401){
          this.svLogin.userLogout();
        }
        console.log('error ' + JSON.stringify(res.status));
      }
    );
    
    this.listPaises = this.svPaises.getListPaises();
    this.listDepartamentos = this.svDepartamentos.getListDepartamentos();
    this.listCiudades = this.svCiudades.getListCiudades();
    this.visibilidadCiudad = false;
    this.visibilidadDepartamento = false; 
  }
  
  crearProveedor() {
  
    if (!this.registerProveedoresForm.valid) {
      alert('Alguna regla de validación no se está cumpliendo');

      return;
    }

    this.proveedor = {};

    let idProveedor = UUID.UUID();

    let tipoProveedor: IdDescripcionI = {};

    tipoProveedor.idType = this.selectedValueTipoProveedor;
    tipoProveedor.description = this.selectedNameTipoProveedor;

    this.proveedor.idProvider = idProveedor;
    this.proveedor.nameProvider = this.registerProveedoresForm.get('nombre').value;
    this.proveedor.nit = this.registerProveedoresForm.get('nit').value;
    this.proveedor.address = this.registerProveedoresForm.get('direccion').value;
    this.proveedor.telephone = this.registerProveedoresForm.get('telefono').value;
    this.proveedor.email = this.registerProveedoresForm.get('email').value;
    this.proveedor.idCountry = this.registerProveedoresForm.get('pais').value;
    this.proveedor.idProvince = this.registerProveedoresForm.get('departamento').value;
    this.proveedor.idCity = this.registerProveedoresForm.get('ciudad').value;
    this.proveedor.types = tipoProveedor;

    this.svCrearProveedor.createVendor(this.proveedor).subscribe(
      (res) => {
        this.responseCrearProveedor = res;

        if(this.responseCrearProveedor.status == "CREATED"){
          alert("Proveedor Creado !!!");
          this.limpiar();
          this.svLogin.refreshToken();
          this.router.navigate(['crearProveedor']);  
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
  
  limpiar() {
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

    this.visibilidadCiudad = false;
    this.visibilidadDepartamento = false;

  }

  
  //Se mapea el name y value del tipo de proveedor
  onSelTipoProveedor(event): void{

    let name = event.target.options[event.target.options.selectedIndex].text;

    this.selectedNameTipoProveedor = name;
    this.selectedValueTipoProveedor = event.target.value;
  }

  //Carga departamentos segun la seleccion de pais
  onSelPais(value: string): void{
    //Limpiar el campo departamentos
    this.registerProveedoresForm.patchValue({departamento: this.listDepartamentos});

    this.listDepartamentos = this.svDepartamentos.getListDepartamentos().filter(item => item.codigoPais == value);
    
    this.visibilidadDepartamento = true; 
  }

  //Carga ciudades segun la seleccion de departamento
  onSelDepartamento(value: string): void{
    //Limpiar el campo ciudades
    this.registerProveedoresForm.patchValue({ciudad: this.listCiudades});

    this.listCiudades = this.svCiudades.getListCiudades().filter(item => item.codigoDepartamento == value);
    
    this.visibilidadCiudad = true;
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
