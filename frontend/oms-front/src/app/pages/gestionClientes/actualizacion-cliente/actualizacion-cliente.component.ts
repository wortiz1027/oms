import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestCrearUsuarioDTO } from 'src/app/models/RequestCrearUsuarioDTO';
import { ResponseCrearUsuarioDTO } from 'src/app/models/ResponseCrearUsuarioDTO';
import { StatusCliente } from 'src/app/models/StatusCliente';
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
  contador: number;

  formDataDetalleCliente: FormGroup;

  responseService: ResponseCrearUsuarioDTO;

  @Output() sendEventUpdateTable: String;

  constructor(private svActualizarCliente: ActualizarUsuarioService,
              private svLogin: LoginService,
              private router: Router) { 

  }

  ngOnInit(){
    this.contador = 1;
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

    let cliente: RequestCrearUsuarioDTO = {};

    let typeCliente = new StatusCliente();
    
    typeCliente = this.getTypeCliente(this.formDataDetalleCliente.get('statusCliente').value);


    cliente.codigo = this.formDataDetalleCliente.get("codigo").value;
    cliente.cedula = this.formDataDetalleCliente.get("identificacion").value;
    cliente.nombres = this.formDataDetalleCliente.get("nombres").value;
    cliente.apellidos = this.formDataDetalleCliente.get("apellidos").value;
    cliente.direccion = this.formDataDetalleCliente.get("direccion").value;
    cliente.email = this.formDataDetalleCliente.get("email").value;
    cliente.fechaNacimiento = this.formDataDetalleCliente.get("fechaNacimiento").value;   
    cliente.telefono = this.formDataDetalleCliente.get("telefono").value;  
    cliente.types = typeCliente;
    cliente.roles = this.formDataDetalleCliente.get("roles").value;
    cliente.username = this.formDataDetalleCliente.get("username").value;
    cliente.password = "123456";

    this.svActualizarCliente.updateUser(cliente).subscribe(
      (res) => {
        this.responseService = res;

        if(this.responseService.status.code == "UPDATED"){
          this.contador++;

          this.sendEventUpdateTable = "ActualizarTabla" + this.contador;
          
          alert("Usuario Actualizado !!!");
          this.svLogin.refreshToken();
          this.visibilidadDetalle = false;
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

  getTypeCliente(field: string): StatusCliente{
    let typeCliente = new StatusCliente();

    switch (field) {
      case '1':
        typeCliente.type = field;
        typeCliente.code = "PLT";
        typeCliente.description = "Platino";
        break;
      case '2':
        typeCliente.type = field;
        typeCliente.code = "DRD";
        typeCliente.description = "Dorado";
        break;
      default:
        typeCliente.type = field;
        typeCliente.code = "PLO";
        typeCliente.description = "Plateado";
    }

    return typeCliente;
  }

}
