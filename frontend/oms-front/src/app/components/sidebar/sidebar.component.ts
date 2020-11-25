import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  {path: '/dashboard', title: 'Dashboard', icon: 'ni-tv-2 text-primary', class: ''},
  {path: '/icons', title: 'Icons', icon: 'ni-planet text-blue', class: ''},
  {path: '/maps', title: 'Maps', icon: 'ni-pin-3 text-orange', class: ''},
  {path: '/user-profile', title: 'User profile', icon: 'ni-single-02 text-yellow', class: ''},
  {path: '/tables', title: 'Tables', icon: 'ni-bullet-list-67 text-red', class: ''},
  {path: '/loginOMS', title: 'Login', icon: 'ni-key-25 text-info', class: ''},
  {path: '/crearProveedor', title: 'Crear Proveedor', icon: 'ni-circle-08 text-pink', class: ''},
  {path: '/crearProducto', title: 'Crear Producto', icon: 'ni-circle-08 text-pink', class: ''},
  {path: '/buscarProducto', title: 'Buscar Producto', icon: 'ni-circle-08 text-pink', class: ''},
  {path: '/actualizarProducto', title: 'Actualizar Producto', icon: 'ni-circle-08 text-pink', class: ''},
  {path: '/eliminarProducto', title: 'Eliminar Producto', icon: 'ni-circle-08 text-pink', class: ''},
  {path: '/crearCliente', title: 'Crear Cliente', icon: 'ni-circle-08 text-pink', class: ''},
  {path: '/buscarCliente', title: 'Buscar Cliente', icon: 'ni-circle-08 text-pink', class: ''},
  {path: '/actualizarCliente', title: 'Actualizar Cliente', icon: 'ni-circle-08 text-pink', class: ''},
  {path: '/crearCampania', title: 'Crear Campaña', icon: 'ni-circle-08 text-pink', class: ''},
  {path: '/asignarProductos', title: 'Asignar Productos Campaña', icon: 'ni-circle-08 text-pink', class: ''},
  {path: '/buscarCampania', title: 'Buscar Campaña', icon: 'ni-circle-08 text-pink', class: ''},
  {path: '/actualizarCampania', title: 'Actualizar Campaña', icon: 'ni-circle-08 text-pink', class: ''},
  {path: '/eliminarCampania', title: 'Eliminar Campaña', icon: 'ni-circle-08 text-pink', class: ''},
  {path: '/crearUsuario', title: 'Crear Usuario', icon: 'ni-circle-08 text-pink', class: ''}
  
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }
}
