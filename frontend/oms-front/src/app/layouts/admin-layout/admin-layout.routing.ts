import {Routes} from '@angular/router';

import {DashboardComponent} from '../../pages/dashboard/dashboard.component';
import {IconsComponent} from '../../pages/icons/icons.component';
import {MapsComponent} from '../../pages/maps/maps.component';
import {UserProfileComponent} from '../../pages/user-profile/user-profile.component';
import {TablesComponent} from '../../pages/tables/tables.component';
import { CreacionProveedoresComponent } from 'src/app/pages/gestionProveedores/creacion-proveedores/creacion-proveedores.component';
import { CreacionProductoComponent } from 'src/app/pages/gestionProductos/creacion-producto/creacion-producto.component';

export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard',                 component: DashboardComponent},
  { path: 'user-profile',              component: UserProfileComponent},
  { path: 'tables',                    component: TablesComponent},
  { path: 'icons',                     component: IconsComponent},
  { path: 'maps',                      component: MapsComponent},
  { path: 'crearProveedor',            component: CreacionProveedoresComponent },
  { path: 'crearProducto',             component: CreacionProductoComponent }
];
