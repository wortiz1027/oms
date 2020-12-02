import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  roles: string[];
}

export const ROUTES: RouteInfo[] = [
  {
    path: '/loginOMS',
    title: 'Login', icon: 'ni-key-25 text-info', class: '', roles: ['']
  },
  {
    path: '/crearProveedor',
    title: 'Crear Proveedor', icon: 'ni-circle-08 text-pink', class: '', roles: ['ROLE_ADMIN']
  },
  {
    path: '/crearProducto',
    title: 'Crear Producto', icon: 'ni-circle-08 text-pink', class: '', roles: ['ROLE_PRODUCTOS_ADMON', 'ROLE_ADMIN']
  },
  {
    path: '/buscarProducto',
    title: 'Buscar Producto', icon: 'ni-circle-08 text-pink', class: '', roles: ['ROLE_PRODUCTOS_CONSULTA', 'ROLE_PRODUCTOS_ADMON', 'ROLE_ADMIN']
  },
  {
    path: '/actualizarProducto',
    title: 'Actualizar Producto', icon: 'ni-circle-08 text-pink', class: '', roles: ['ROLE_PRODUCTOS_ADMON', 'ROLE_ADMIN']
  },
  {
    path: '/eliminarProducto',
    title: 'Eliminar Producto', icon: 'ni-circle-08 text-pink', class: '', roles: ['ROLE_PRODUCTOS_ADMON', 'ROLE_ADMIN']
  },
  {
    path: '/crearCliente',
    title: 'Crear Cliente', icon: 'ni-circle-08 text-pink', class: '', roles: ['ROLE_CLIENTES_ADMON', 'ROLE_ADMIN', 'ROLE_CLIENT']
  },
  {
    path: '/buscarCliente',
    title: 'Buscar Cliente', icon: 'ni-circle-08 text-pink', class: '', roles: ['ROLE_CLIENTES_ADMON', 'ROLE_CLIENTES_CONSULTA', 'ROLE_ADMIN', 'ROLE_CLIENT']
  },
  {
    path: '/actualizarCliente',
    title: 'Actualizar Cliente', icon: 'ni-circle-08 text-pink', class: '', roles: ['ROLE_CLIENTES_ADMON', 'ROLE_ADMIN', 'ROLE_CLIENT']
  },
  {
    path: '/crearCampania',
    title: 'Crear Campaña', icon: 'ni-circle-08 text-pink', class: '', roles: ['ROLE_CAMPANAS', 'ROLE_ADMIN']
  },
  {
    path: '/asignarProductos',
    title: 'Asignar Productos Campaña', icon: 'ni-circle-08 text-pink', class: '', roles: ['ROLE_PRODUCTOS_ADMON', 'ROLE_ADMIN']
  },
  {
    path: '/buscarCampania',
    title: 'Buscar Campaña', icon: 'ni-circle-08 text-pink', class: '', roles: ['ROLE_CAMPANAS', 'ROLE_ADMIN']
  },
  {
    path: '/actualizarCampania',
    title: 'Actualizar Campaña', icon: 'ni-circle-08 text-pink', class: '', roles: ['ROLE_CAMPANAS', 'ROLE_ADMIN']
  },
  {
    path: '/eliminarCampania',
    title: 'Eliminar Campaña', icon: 'ni-circle-08 text-pink', class: '', roles: ['ROLE_CAMPANAS', 'ROLE_ADMIN']
  },
  {
    path: '/crearUsuario',
    title: 'Crear Usuario', icon: 'ni-circle-08 text-pink', class: '', roles: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_CLIENTES_ADMON']
  },
  {
    path: '/buscarOrden',
    title: 'Buscar Orden', icon: 'ni-circle-08 text-pink', class: '', roles: ['ROLE_ORDENES_CONSULTA', 'ROLE_ORDENES_ADMON', 'ROLE_ADMIN']
  },
  {
    path: '/cancelarOrden',
    title: 'Cancelar Orden', icon: 'ni-circle-08 text-pink', class: '', roles: ['ROLE_ORDENES_ADMON', 'ROLE_ADMIN']
  }

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router,
    private _loginService: LoginService) {
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => {
      if (menuItem.title === 'Login') {
        return true;
      }
      for (let i = 0; i < menuItem.roles.length; i++) {
        if (this._loginService.validateRol(menuItem.roles[i])) {
          return true;
        }
      }
      return false;
    });
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }
}
