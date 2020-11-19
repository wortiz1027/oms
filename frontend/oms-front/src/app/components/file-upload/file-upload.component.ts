import { Component, Input, OnInit } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styles: []
})
export class FileUploadComponent implements OnInit {

  public imageURL: string;
  public nombreImagen: string;
  public base64: string;
  public file: File;
  public fileBase64: string;

  constructor() { }

  ngOnInit(): void {
  }

  uploadDocuments(event: any, uploader: FileUpload) {
    this.file = null;
    this.fileBase64 = "";
    const reader = new FileReader();

    if(event.files[0] != null){
      reader.readAsDataURL(event.files[0]);

      reader.onload = () => {
        this.fileBase64 = reader.result.toString().replace(/^data:(.*,)?/, ''),
        this.file = event.files[0]
      };
    }

    reader.onerror = (error) => {
    };
    uploader.clear();
  }

}
