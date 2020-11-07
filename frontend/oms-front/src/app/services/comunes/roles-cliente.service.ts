import { Injectable } from '@angular/core';
import { RolesCliente } from 'src/app/models/RolesCliente';

@Injectable()
export class RolesClienteService {

  private listRoles: RolesCliente [] = [
    {
      idRole: "1",
      role: "ROLE_ADMIN"
    },
    {
      idRole: "2",
      role: "ROLE_USER"
    },
    {
      idRole: "3",
      role: "ROLE_CLIENT"
    },
    {
      idRole: "4",
      role: "ROLE_GUEST"
    },
    {
      idRole: "5",
      role: "ROLE_PRODUCTOS_CONSULTA"
    },
    {
      idRole: "6",
      role: "ROLE_PRODUCTOS_ADMON"
    },
    {
      idRole: "7",
      role: "ROLE_CAMPANAS"
    },
    {
      idRole: "8",
      role: "ROLE_ORDENES_CONSULTA"
    },
    {
      idRole: "9",
      role: "ROLE_ORDENES_ADMON"
    },
    {
      idRole: "10",
      role: "ROLE_CLIENTES_CONSULTA"
    },
    {
      idRole: "11",
      role: "ROLE_CLIENTES_ADMON"
    }
  ];

  constructor() { }

  getListRoles(): RolesCliente[]{
    return this.listRoles;
  }
}

