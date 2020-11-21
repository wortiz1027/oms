import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styles: []
})
export class FileUploadComponent implements OnInit {

  public file: File = null;
  public fileBase64: string = "";
  imagen: any = {};

  @Output() sendFileUpload = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {

  }

  uploadDocuments(event: any, uploader: FileUpload) {
    const reader = new FileReader();

    if(event.files[0] != null){
      reader.readAsDataURL(event.files[0]);

      reader.onload = () => {
        this.fileBase64 = reader.result.toString().replace(/^data:(.*,)?/, '');
        this.file = event.files[0];
        
        this.imagen.fileBase64 = reader.result.toString().replace(/^data:(.*,)?/, '');
        this.imagen.file = event.files[0];

        this.sendFileUpload.emit(this.imagen);
      };
      
    }
    reader.onerror = (error) => {
    };
    uploader.clear();
  }

}
