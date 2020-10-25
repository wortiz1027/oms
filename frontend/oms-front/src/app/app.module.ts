import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {AuthLayoutComponent} from './layouts/auth-layout/auth-layout.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';

import {AppRoutingModule} from './app.routing';
import {ComponentsModule} from './components/components.module';
import { CreacionProveedoresComponent } from './pages/gestionProveedores/creacion-proveedores/creacion-proveedores.component';
import { CreacionProductoComponent } from './pages/gestionProductos/creacion-producto/creacion-producto.component';
import { ActualizacionProductoComponent } from './pages/gestionProductos/actualizacion-producto/actualizacion-producto.component';
import { EliminacionProductoComponent } from './pages/gestionProductos/eliminacion-producto/eliminacion-producto.component';
import { BuscarProductoComponent } from './pages/gestionProductos/buscar-producto/buscar-producto.component';

import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { DetalleProductoComponent } from './pages/gestionProductos/detalle-producto/detalle-producto.component';
import { BusquedaProductoComponent } from './pages/gestionProductos/busqueda-producto/busqueda-producto.component';
import { BusquedaClienteComponent } from './pages/gestionClientes/busqueda-cliente/busqueda-cliente.component';
import { CreacionClienteComponent } from './pages/gestionClientes/creacion-cliente/creacion-cliente.component';
import { BuscarClienteComponent } from './pages/gestionClientes/buscar-cliente/buscar-cliente.component';
import { ActualizacionClienteComponent } from './pages/gestionClientes/actualizacion-cliente/actualizacion-cliente.component';
import { DetalleClienteComponent } from './pages/gestionClientes/detalle-cliente/detalle-cliente.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    CreacionProveedoresComponent,
    CreacionProductoComponent,
    ActualizacionProductoComponent,
    EliminacionProductoComponent,
    BuscarProductoComponent,
    DetalleProductoComponent,
    BusquedaProductoComponent,
    BusquedaClienteComponent,
    CreacionClienteComponent,
    BuscarClienteComponent,
    ActualizacionClienteComponent,
    DetalleClienteComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
