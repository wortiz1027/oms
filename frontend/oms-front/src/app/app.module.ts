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
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    CreacionProveedoresComponent,
    CreacionProductoComponent,
    ActualizacionProductoComponent,
    EliminacionProductoComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
