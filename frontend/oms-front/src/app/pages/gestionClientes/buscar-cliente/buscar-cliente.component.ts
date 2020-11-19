import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';

//import { Paginator } from 'primeng/paginator';
import { RequestBuscarUsuarioDTO } from 'src/app/models/RequestBuscarUsuarioDTO';
import { RequestCrearUsuarioDTO } from 'src/app/models/RequestCrearUsuarioDTO';
import { ResponseBuscarUsuarioDTO } from 'src/app/models/ResponseBuscarUsuarioDTO';
import { LoginService } from 'src/app/services/login/login.service';
import { BuscarUsuarioService } from 'src/app/services/usuarios/buscar-usuario.service';

@Component({
  selector: 'app-buscar-cliente',
  templateUrl: './buscar-cliente.component.html',
  styles: []
})
export class BuscarClienteComponent implements OnInit {
  reqBuscarUsuario: RequestBuscarUsuarioDTO;
  resBuscarUsuario: ResponseBuscarUsuarioDTO;
  lstClientes: RequestCrearUsuarioDTO[];
  totalRecords: number;
  first: number = 0;
  
  @Output() sendClienteSelect = new EventEmitter<RequestCrearUsuarioDTO>();
  @Output() sendClienteUnSelect = new EventEmitter<RequestCrearUsuarioDTO>();

  selectedCliente: RequestCrearUsuarioDTO;

  //@ViewChild('paginator', { static: true }) paginator: Paginator

  constructor(private formBuilder: FormBuilder,
              private svBuscarUsuario: BuscarUsuarioService,
              private svLogin: LoginService
            ) {

  }

  busquedaClientesForm = this.formBuilder.group({
    busquedaCliente: ['']
  });

  ngOnInit(){
    this.lstClientes = []; 
  }

  buscar() {
    this.reqBuscarUsuario = {};
    this.lstClientes = []; 
    let cliente: RequestCrearUsuarioDTO = {};
    
    this.reqBuscarUsuario.cedula = this.busquedaClientesForm.get('busquedaCliente').value;
    this.reqBuscarUsuario.page = "0";
    this.reqBuscarUsuario.size = "5";
    this.reqBuscarUsuario.token = this.svLogin.getToken().valueOf();

    if(this.reqBuscarUsuario.cedula != null && this.reqBuscarUsuario.cedula.trim() != ""){
      this.svBuscarUsuario.buscarUsuarioCedula(this.reqBuscarUsuario).subscribe(
        (res) => {
          this.resBuscarUsuario = res;

          if(this.resBuscarUsuario.status.code == "SUCCESS"){
            cliente.codigo = String(this.resBuscarUsuario.user.idUser);
            cliente.cedula = String(this.resBuscarUsuario.user.cedula);
            cliente.nombres = this.resBuscarUsuario.user.nombre;
            cliente.apellidos = this.resBuscarUsuario.user.apellido;
            cliente.direccion = this.resBuscarUsuario.user.direccion;
            cliente.email = this.resBuscarUsuario.user.email;
            cliente.fechaNacimiento = new Date(this.resBuscarUsuario.user.fechaNacimiento);
            cliente.telefono = this.resBuscarUsuario.user.telefono;
            cliente.types = this.resBuscarUsuario.user.types;
            cliente.roles = this.resBuscarUsuario.user.roles;
            cliente.username = this.resBuscarUsuario.user.username;
            cliente.accountNonExpired = this.resBuscarUsuario.user.accountNonExpired;           
            cliente.credentialNonExpired = this.resBuscarUsuario.user.credentialNonExpired;
            cliente.enable = this.resBuscarUsuario.user.enable;
            
            this.lstClientes.push(cliente);

            this.totalRecords = 1;
            this.svLogin.refreshToken();

            this.limpiar();
          }else {
            alert(this.resBuscarUsuario.status.description);

            this.limpiar();
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
      this.svBuscarUsuario.buscarUsuarios(this.reqBuscarUsuario).subscribe(
        (res) => {
          this.resBuscarUsuario = res;

          if(this.resBuscarUsuario.users.length > 0){
            for(let i= 0; i < this.resBuscarUsuario.users.length; i++){
              cliente = {};

              cliente.codigo = String(this.resBuscarUsuario.users[i].idUser);
              cliente.cedula = String(this.resBuscarUsuario.users[i].cedula);
              cliente.nombres = this.resBuscarUsuario.users[i].nombre;
              cliente.apellidos = this.resBuscarUsuario.users[i].apellido;
              cliente.direccion = this.resBuscarUsuario.users[i].direccion;
              cliente.email = this.resBuscarUsuario.users[i].email;
              cliente.fechaNacimiento = new Date(this.resBuscarUsuario.users[i].fechaNacimiento);
              cliente.telefono = this.resBuscarUsuario.users[i].telefono;
              cliente.types = this.resBuscarUsuario.users[i].types;
              cliente.roles = this.resBuscarUsuario.users[i].roles;
              cliente.username = this.resBuscarUsuario.users[i].username;
              cliente.accountNonExpired = this.resBuscarUsuario.users[i].accountNonExpired;           
              cliente.credentialNonExpired = this.resBuscarUsuario.users[i].credentialNonExpired;
              cliente.enable = this.resBuscarUsuario.users[i].enable;

              this.lstClientes.push(cliente);

              this.totalRecords = this.resBuscarUsuario.totalItems;
            }
          }
          this.svLogin.refreshToken();
        },
        (res) => {
          if(res.status == 401){
            this.svLogin.userLogout();
          }
          console.log('error ' + JSON.stringify(res.status));
        }
      );
    }
  
  }

  limpiar() {
    this.busquedaClientesForm.patchValue({
      busquedaCliente: ''
    });
  }

  paginate(event) {
    this.first = event.first;

    this.reqBuscarUsuario = {};
    this.lstClientes = []; 
    let cliente: RequestCrearUsuarioDTO = {};
    
    this.reqBuscarUsuario.cedula = this.busquedaClientesForm.get('busquedaCliente').value;
    this.reqBuscarUsuario.page = String(event.page == 0 ? 0 : event.page);
    this.reqBuscarUsuario.size = "5";
    this.reqBuscarUsuario.token = this.svLogin.getToken().valueOf();

    if(this.reqBuscarUsuario.cedula != null && this.reqBuscarUsuario.cedula.trim() != ""){
      this.svBuscarUsuario.buscarUsuarioCedula(this.reqBuscarUsuario).subscribe(
        (res) => {
          this.resBuscarUsuario = res;

          if(this.resBuscarUsuario.status.code == "SUCCESS"){
            cliente.codigo = String(this.resBuscarUsuario.user.idUser);
            cliente.cedula = String(this.resBuscarUsuario.user.cedula);
            cliente.nombres = this.resBuscarUsuario.user.nombre;
            cliente.apellidos = this.resBuscarUsuario.user.apellido;
            cliente.direccion = this.resBuscarUsuario.user.direccion;
            cliente.email = this.resBuscarUsuario.user.email;
            cliente.fechaNacimiento = new Date(this.resBuscarUsuario.user.fechaNacimiento);
            cliente.telefono = this.resBuscarUsuario.user.telefono;
            cliente.types = this.resBuscarUsuario.user.types;
            cliente.roles = this.resBuscarUsuario.user.roles;
            cliente.username = this.resBuscarUsuario.user.username;
            cliente.accountNonExpired = this.resBuscarUsuario.user.accountNonExpired;           
            cliente.credentialNonExpired = this.resBuscarUsuario.user.credentialNonExpired;
            cliente.enable = this.resBuscarUsuario.user.enable;
            
            this.lstClientes.push(cliente);

            this.totalRecords = 1;

            this.svLogin.refreshToken();

            this.limpiar();
          }else {
            alert(this.resBuscarUsuario.status.description);

            this.limpiar();
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
      this.svBuscarUsuario.buscarUsuarios(this.reqBuscarUsuario).subscribe(
        (res) => {
          this.resBuscarUsuario = res;

          if(this.resBuscarUsuario.users.length > 0){
            for(let i= 0; i < this.resBuscarUsuario.users.length; i++){
              cliente = {};

              cliente.codigo = String(this.resBuscarUsuario.users[i].idUser);
              cliente.cedula = String(this.resBuscarUsuario.users[i].cedula);
              cliente.nombres = this.resBuscarUsuario.users[i].nombre;
              cliente.apellidos = this.resBuscarUsuario.users[i].apellido;
              cliente.direccion = this.resBuscarUsuario.users[i].direccion;
              cliente.email = this.resBuscarUsuario.users[i].email;
              cliente.fechaNacimiento = new Date(this.resBuscarUsuario.users[i].fechaNacimiento);
              cliente.telefono = this.resBuscarUsuario.users[i].telefono;
              cliente.types = this.resBuscarUsuario.users[i].types;
              cliente.roles = this.resBuscarUsuario.users[i].roles;
              cliente.username = this.resBuscarUsuario.users[i].username;
              cliente.accountNonExpired = this.resBuscarUsuario.users[i].accountNonExpired;           
              cliente.credentialNonExpired = this.resBuscarUsuario.users[i].credentialNonExpired;
              cliente.enable = this.resBuscarUsuario.users[i].enable;

              this.lstClientes.push(cliente);

              this.totalRecords = this.resBuscarUsuario.totalItems;
            }
          }
          this.svLogin.refreshToken(); 
        },
        (res) => {
          if(res.status == 401){
            this.svLogin.userLogout();
          }
          console.log('error ' + JSON.stringify(res.status));
        }
      );
    }

  }

  onRowSelect(event) {
    this.sendClienteSelect.emit(this.selectedCliente);
  }

  onRowUnselect(event) {
    this.selectedCliente = {};

    this.sendClienteUnSelect.emit(this.selectedCliente);
  }

}



