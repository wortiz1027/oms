import {Routes} from '@angular/router';

import {DashboardComponent} from '../../pages/dashboard/dashboard.component';
import {IconsComponent} from '../../pages/icons/icons.component';
import {MapsComponent} from '../../pages/maps/maps.component';
import {UserProfileComponent} from '../../pages/user-profile/user-profile.component';
import {TablesComponent} from '../../pages/tables/tables.component';
import { CreacionProveedoresComponent } from 'src/app/pages/gestionProveedores/creacion-proveedores/creacion-proveedores.component';
import { CreacionProductoComponent } from 'src/app/pages/gestionProductos/creacion-producto/creacion-producto.component';
import { ActualizacionProductoComponent } from 'src/app/pages/gestionProductos/actualizacion-producto/actualizacion-producto.component';
import { EliminacionProductoComponent } from 'src/app/pages/gestionProductos/eliminacion-producto/eliminacion-producto.component';
import { BusquedaProductoComponent } from 'src/app/pages/gestionProductos/busqueda-producto/busqueda-producto.component';
import { CreacionClienteComponent } from 'src/app/pages/gestionClientes/creacion-cliente/creacion-cliente.component';
import { BusquedaClienteComponent } from 'src/app/pages/gestionClientes/busqueda-cliente/busqueda-cliente.component';
import { ActualizacionClienteComponent } from 'src/app/pages/gestionClientes/actualizacion-cliente/actualizacion-cliente.component';
import { CreacionCampaniaComponent } from 'src/app/pages/gestionCampañas/creacion-campania/creacion-campania.component';
import { ActualizacionCampaniaComponent } from 'src/app/pages/gestionCampañas/actualizacion-campania/actualizacion-campania.component';
import { EliminacionCampaniaComponent } from 'src/app/pages/gestionCampañas/eliminacion-campania/eliminacion-campania.component';
import { AsignarProductosComponent } from 'src/app/pages/gestionCampañas/asignar-productos/asignar-productos.component';

export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard',                 component: DashboardComponent},
  { path: 'user-profile',              component: UserProfileComponent},
  { path: 'tables',                    component: TablesComponent},
  { path: 'icons',                     component: IconsComponent},
  { path: 'maps',                      component: MapsComponent},
  { path: 'crearProveedor',            component: CreacionProveedoresComponent},
  { path: 'crearProducto',             component: CreacionProductoComponent},
  { path: 'buscarProducto',            component: BusquedaProductoComponent},
  { path: 'actualizarProducto',        component: ActualizacionProductoComponent},
  { path: 'eliminarProducto',          component: EliminacionProductoComponent},
  { path: 'crearCliente',              component: CreacionClienteComponent},
  { path: 'buscarCliente',             component: BusquedaClienteComponent},
  { path: 'actualizarCliente',         component: ActualizacionClienteComponent},
  { path: 'crearCampania',             component: CreacionCampaniaComponent},
  { path: 'actualizarCampania',        component: ActualizacionCampaniaComponent},
  { path: 'eliminarCampania',          component: EliminacionCampaniaComponent},
  { path: 'asignarProductos',          component: AsignarProductosComponent}
  
];
