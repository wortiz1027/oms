import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RequestCrearCampaniaDTO } from 'src/app/models/RequestCrearCampaniaDTO';

@Component({
  selector: 'app-detalle-campania-edit',
  templateUrl: './detalle-campania-edit.component.html',
  styles: []
})
export class DetalleCampaniaEditComponent implements OnInit {

    public minDate: Date;
    public maxDate: Date;
  
    urlImage: string;
  
    @Input() campania: RequestCrearCampaniaDTO; 
    @Output() sendDetalleCampania = new EventEmitter<DetalleCampaniaEditComponent>();
  
    constructor(private formBuilder: FormBuilder) {
        
        //Se establece la fecha minimay maxima
        const currentYear = new Date().getFullYear();
        this.minDate = new Date();
        this.maxDate = new Date(currentYear + 0, 11, 31);
    }
  
    detalleCampaniasForm = this.formBuilder.group({
      idCampania: [''],
      codigo: ['', { validators: [Validators.required]}],
      nombre: ['', { validators: [Validators.required]}],
      descripcion: ['', { validators: [Validators.required]}],
      fechaInicial: ['', { validators: [Validators.required]}],
      fechaFinal: ['', { validators: [Validators.required]}],
      descuento: ['', { validators: [Validators.required]}],
      status: ['', { validators: [Validators.required]}],
      action: [''],
      imagen: [''],
      urlImagen: ['']
    });
  
    ngOnInit() {
      this.sendDetalleCampania.emit(this);
    } 
  
    ngOnChanges(changes: SimpleChanges): void {
      if (changes.campania.currentValue) {
  
        let campania: RequestCrearCampaniaDTO = changes.campania.currentValue;
  
        this.detalleCampaniasForm.controls['idCampania'].setValue(campania ? campania.campaignId ? campania.campaignId :"" : "");
        this.detalleCampaniasForm.controls['codigo'].setValue(campania.campaignCode);
        this.detalleCampaniasForm.controls['nombre'].setValue(campania.campaignName);
        this.detalleCampaniasForm.controls['descripcion'].setValue(campania.campaignDescription);
        this.detalleCampaniasForm.controls['descuento'].setValue(campania.discount);
        this.detalleCampaniasForm.controls['fechaInicial'].setValue(campania.startDate);
        this.detalleCampaniasForm.controls['fechaFinal'].setValue(campania.endDate);
        this.detalleCampaniasForm.controls['status'].setValue(campania.status);
        this.detalleCampaniasForm.controls['action'].setValue(campania.action);
        this.detalleCampaniasForm.controls['imagen'].setValue(campania ? campania.image ? campania.image :{} : {});
        this.detalleCampaniasForm.controls['urlImagen'].setValue(campania ? campania.image ? campania.image.url ? campania.image.url :"" : "" : {});
  
        this.urlImage = this.detalleCampaniasForm.controls['urlImagen'].value;
      }
    }
  
    //Metodos Para validacion de campos
    getMensajeError(field:string): string{
      let mensaje: string;
    
      if(this.detalleCampaniasForm.get(field).errors.required){
        mensaje = 'El campo es requerido';
      }
    
      return mensaje;
    }
    
    verificarCampo(field: string): boolean{
      return ((this.detalleCampaniasForm.get(field).dirty || this.detalleCampaniasForm.get(field).touched) && 
              (this.detalleCampaniasForm.get(field).invalid || this.detalleCampaniasForm.get(field).errors?.required));
    }
  
  }
  
  
  