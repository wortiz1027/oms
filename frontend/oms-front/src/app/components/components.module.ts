import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarComponent} from './sidebar/sidebar.component';
import {NavbarComponent} from './navbar/navbar.component';
import {FooterComponent} from './footer/footer.component';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FileUploadComponent } from './file-upload/file-upload.component';
import {FileUploadModule} from 'primeng/fileupload';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FileUploadModule,
    ButtonModule,
    TabViewModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    FileUploadComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    FileUploadComponent
  ]
})
export class ComponentsModule {
}
