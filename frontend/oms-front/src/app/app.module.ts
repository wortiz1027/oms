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
import { CreacionCampaniaComponent } from './pages/gestionCampa??as/creacion-campania/creacion-campania.component';
import { DetalleCampaniaComponent } from './pages/gestionCampa??as/detalle-campania/detalle-campania.component';
import { BuscarCampaniaComponent } from './pages/gestionCampa??as/buscar-campania/buscar-campania.component';
import { ActualizacionCampaniaComponent } from './pages/gestionCampa??as/actualizacion-campania/actualizacion-campania.component';
import { EliminacionCampaniaComponent } from './pages/gestionCampa??as/eliminacion-campania/eliminacion-campania.component';
import { AsignarProductosComponent } from './pages/gestionCampa??as/asignar-productos/asignar-productos.component';

import { LoginService } from './services/login/login.service';
import { AutguardService } from './services/guard/autguard.service';
import { LoginOmsComponent } from './pages/login-oms/login-oms.component';
import { CrearUsuarioComponent } from './pages/gestionUsuarios/crear-usuario/crear-usuario.component';

import {MatCardModule} from '@angular/material/card';

//Nuevos
import { BrowserModule } from '@angular/platform-browser';
import { TableModule} from 'primeng/table';
import { ButtonModule} from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { PaginatorModule} from 'primeng/paginator';
import { DetalleClienteEditComponent } from './pages/gestionClientes/detalle-cliente-edit/detalle-cliente-edit.component';
import { DetalleProductoEditComponent } from './pages/gestionProductos/detalle-producto-edit/detalle-producto-edit.component';
import { DetalleCampaniaEditComponent } from './pages/gestionCampa??as/detalle-campania-edit/detalle-campania-edit.component';
import { BusquedaCampaniaComponent } from './pages/gestionCampa??as/busqueda-campania/busqueda-campania.component';
import { BuscarProductosCampaniaComponent } from './pages/gestionCampa??as/buscar-productos-campania/buscar-productos-campania.component';
import { DetalleProductosCampaniaComponent } from './pages/gestionCampa??as/detalle-productos-campania/detalle-productos-campania.component';
import { BuscarOrdenComponent } from './pages/gestionOrden/buscar-orden/buscar-orden.component';
import { BusquedaOrdenComponent } from './pages/gestionOrden/busqueda-orden/busqueda-orden.component';
import { DetalleOrdenComponent } from './pages/gestionOrden/detalle-orden/detalle-orden.component';
import { CancelarOrdenComponent } from './pages/gestionOrden/cancelar-orden/cancelar-orden.component';


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
    MatPaginatorModule,
    MatCardModule,
    //nuevos
    BrowserModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    RadioButtonModule,
    InputSwitchModule,
    PaginatorModule

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
    DetalleClienteComponent,
    CreacionCampaniaComponent,
    DetalleCampaniaComponent,
    BuscarCampaniaComponent,
    ActualizacionCampaniaComponent,
    EliminacionCampaniaComponent,
    AsignarProductosComponent,
    LoginOmsComponent,
    CrearUsuarioComponent,
    DetalleClienteEditComponent,
    DetalleProductoEditComponent,
    DetalleCampaniaEditComponent,
    BusquedaCampaniaComponent,
    BuscarProductosCampaniaComponent,
    DetalleProductosCampaniaComponent,
    BuscarOrdenComponent,
    BusquedaOrdenComponent,
    DetalleOrdenComponent,
    CancelarOrdenComponent
  ],
  providers: [AutguardService,
              LoginService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
