import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styles: []
})
export class FileUploadComponent implements OnInit {

  public imageURL: string;
  public nombreImagen: string;
  public base64: string;

  constructor(private formBuilder: FormBuilder) { }

  fileUploadForm = this.formBuilder.group({
    imagen: [null],
    nombreImagen: ['', { validators: [Validators.required]}]
  });

  ngOnInit(): void {
  }

  //Carga imagenes
  showPreview(event) {
    const file = (event.target as HTMLInputElement).files[0];

    this.fileUploadForm.patchValue({
      imagen: file
    });

    this.fileUploadForm.get('imagen').updateValueAndValidity()

    // File Preview
    const reader = new FileReader();

    reader.onload = () => {
      this.imageURL = reader.result as string;
      let temp64;
      temp64 = this.imageURL.split(',', this.imageURL.length);

      this.base64 = temp64[1];
    }

    reader.readAsDataURL(file)
  }

  refrescar() {
    this.fileUploadForm.patchValue({
      imagen: null,
      nombreImagen: ''
    });
  }

  //Metodos Para validacion de campos
  getMensajeError(field:string): string{
    let mensaje: string;
  
    if(this.fileUploadForm.get(field).errors.required){
      mensaje = 'El campo es requerido';
    }
  
    return mensaje;
  }
  
  verificarCampo(field: string): boolean{
    return ((this.fileUploadForm.get(field).dirty || this.fileUploadForm.get(field).touched) && 
            (this.fileUploadForm.get(field).invalid || this.fileUploadForm.get(field).errors?.required));
  } 

}
