import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RequestCrearUsuarioDTO } from 'src/app/models/RequestCrearUsuarioDTO';
import { ResponseCrearUsuarioDTO } from 'src/app/models/ResponseCrearUsuarioDTO';
import { LoginService } from 'src/app/services/login/login.service';
import { ActualizarUsuarioService } from 'src/app/services/usuarios/actualizar-usuario.service';
import { DetalleClienteEditComponent } from '../detalle-cliente-edit/detalle-cliente-edit.component';

@Component({
  selector: 'app-actualizacion-cliente',
  templateUrl: './actualizacion-cliente.component.html',
  styles: []
})

export class ActualizacionClienteComponent implements OnInit {

  cliente: RequestCrearUsuarioDTO;
  visibilidadDetalle:Boolean;

  formDataDetalleCliente: FormGroup;

  responseService: ResponseCrearUsuarioDTO;
  router: any;

  constructor(private svActualizarCliente: ActualizarUsuarioService,
              private svLogin: LoginService) { 

  }

  ngOnInit(){

  }

  onRowSelect(cliente: RequestCrearUsuarioDTO) {
    this.cliente = cliente;
    this.visibilidadDetalle = true;
  }
  
  onRowUnselect(cliente: RequestCrearUsuarioDTO) {
    this.cliente = cliente;
    this.visibilidadDetalle = false;
  }

  showFormContactData(componentDetalleCliente: DetalleClienteEditComponent) {
    this.formDataDetalleCliente = componentDetalleCliente.detalleClientesForm;
  }

  actualizar() {

    if (!this.formDataDetalleCliente.valid) {
      alert('Alguna regla de validación no se está cumpliendo');

      return;
    }

    alert('¿Seguro que quiere actualizar el cliente?');

    
    let cliente: RequestCrearUsuarioDTO = {};

    cliente.codigo = this.formDataDetalleCliente.get("codigo").value;
    cliente.cedula = this.formDataDetalleCliente.get("cedula").value;
    cliente.nombres = this.formDataDetalleCliente.get("nombres").value;
    cliente.apellidos = this.formDataDetalleCliente.get("apellidos").value;
    cliente.fechaNacimiento = this.formDataDetalleCliente.get("fechaNacimiento").value;
    cliente.direccion = this.formDataDetalleCliente.get("direccion").value;
    cliente.telefono = this.formDataDetalleCliente.get("telefono").value;
    cliente.email = this.formDataDetalleCliente.get("email").value;
    cliente.username = this.formDataDetalleCliente.get("username").value;
    cliente.password = "";
    cliente.types = this.formDataDetalleCliente.get("types").value;
    cliente.roles = this.formDataDetalleCliente.get("roles").value;

    this.svActualizarCliente.updateUser(this.cliente).subscribe(
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
    
    return;
  }

}
