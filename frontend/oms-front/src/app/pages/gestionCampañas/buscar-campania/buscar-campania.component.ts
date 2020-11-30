import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Paginator } from 'primeng/paginator';
import { RequestBuscarCampaniaDTO } from 'src/app/models/RequestBuscarCampaniaDTO';
import { RequestBuscarProductoDTO } from 'src/app/models/RequestBuscarProductoDTO';
import { RequestCrearCampaniaDTO } from 'src/app/models/RequestCrearCampaniaDTO';
import { ResponseBuscarCampaniaDTO } from 'src/app/models/ResponseBuscarCampaniaDTO';
import { ResponseBuscarProductoCampaniaDTO } from 'src/app/models/ResponseBuscarProductoCampaniaDTO';
import { BuscarCampaniaService } from 'src/app/services/campania/buscar-campania.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-buscar-campania',
  templateUrl: './buscar-campania.component.html',
  styles: []
})
export class BuscarCampaniaComponent implements OnInit {
  reqBuscarCampania: RequestBuscarCampaniaDTO;
  resBuscarCampania: ResponseBuscarCampaniaDTO;
  reqBuscarProductoCampania: RequestBuscarProductoDTO;
  resBuscarProductoCampania: ResponseBuscarProductoCampaniaDTO;
  lstCampanias: RequestCrearCampaniaDTO[];
  totalRecords: number;
  first: number = 0;

  @Output() sendCampaniaSelect = new EventEmitter<RequestCrearCampaniaDTO>();
  @Output() sendCampaniaUnSelect = new EventEmitter<RequestCrearCampaniaDTO>();

  @Output() sendProductosCampaniaSelect = new EventEmitter<ResponseBuscarProductoCampaniaDTO>();

  selectedCampania: RequestCrearCampaniaDTO;
  selectedProductosCampania: ResponseBuscarProductoCampaniaDTO;

  @ViewChild('paginator', { static: true }) paginator: Paginator;

  @Input() sendEventUpdateTable: String;

  constructor(private formBuilder: FormBuilder,
              private svBuscarCampania: BuscarCampaniaService,
              private svLogin: LoginService
            ) {

  }

  busquedaCampaniasForm = this.formBuilder.group({
    busquedaCampania: ['']
  });
  
  ngOnInit() {
    this.lstCampanias = []; 
  }
  
  buscar() {
    this.reqBuscarCampania = {};
    this.lstCampanias = []; 
    let campania: RequestCrearCampaniaDTO = {};
    
    this.reqBuscarCampania.text = this.busquedaCampaniasForm.get('busquedaCampania').value;
    this.reqBuscarCampania.page = "0";
    this.reqBuscarCampania.size = "5";

    if(this.reqBuscarCampania.text != null && this.reqBuscarCampania.text.trim() != ""){
      this.svBuscarCampania.buscarCampaniaText(this.reqBuscarCampania).subscribe(
        (res) => {
          this.resBuscarCampania = res;

          if(this.resBuscarCampania.status.code == "SUCCESS"){
            if(this.resBuscarCampania.data.campaigns != null && this.resBuscarCampania.data.campaigns.length > 0){
              for(let i= 0; i < this.resBuscarCampania.data.campaigns.length; i++){
                campania = {};
  
                campania.campaignId = this.resBuscarCampania.data.campaigns[i].campaignId;
                campania.campaignCode = this.resBuscarCampania.data.campaigns[i].campaignCode;
                campania.campaignName = this.resBuscarCampania.data.campaigns[i].campaignName;
                campania.campaignDescription = this.resBuscarCampania.data.campaigns[i].campaignDescription;
                campania.discount = this.resBuscarCampania.data.campaigns[i].discount;
                campania.startDate = this.resBuscarCampania.data.campaigns[i].startDate; 
                campania.endDate = this.resBuscarCampania.data.campaigns[i].endDate;
                campania.status = this.resBuscarCampania.data.campaigns[i].status;
                campania.action = this.resBuscarCampania.data.campaigns[i].action;
                campania.image = this.resBuscarCampania.data.campaigns[i].image;       
  
                this.lstCampanias.push(campania);
  
                this.totalRecords = this.resBuscarCampania.data.totalItems;
              }
            }
            this.svLogin.refreshToken();

            this.limpiar();
          }else {
            alert(this.resBuscarCampania.status.description);

            this.limpiar();
          }
        },
        (res) => {
          this.selectedCampania = {};

          this.sendCampaniaUnSelect.emit(this.selectedCampania);
          
          if(res.status == 401){
            this.svLogin.userLogout();
          }else if(res.error.status.code == "ERROR"){
            alert("No se encontró ningún producto con ese texto");
          }
        }
      );
    }else{
      this.svBuscarCampania.buscarCampañas(this.reqBuscarCampania).subscribe(
        (res) => {
          this.resBuscarCampania = res;

          if(this.resBuscarCampania.data.campaigns != null && this.resBuscarCampania.data.campaigns.length > 0){
            for(let i= 0; i < this.resBuscarCampania.data.campaigns.length; i++){
              campania = {};
              
              campania.campaignId = this.resBuscarCampania.data.campaigns[i].campaignId;
              campania.campaignCode = this.resBuscarCampania.data.campaigns[i].campaignCode;
              campania.campaignName = this.resBuscarCampania.data.campaigns[i].campaignName;
              campania.campaignDescription = this.resBuscarCampania.data.campaigns[i].campaignDescription;
              campania.discount = this.resBuscarCampania.data.campaigns[i].discount;
              campania.startDate = this.resBuscarCampania.data.campaigns[i].startDate; 
              campania.endDate = this.resBuscarCampania.data.campaigns[i].endDate;
              campania.status = this.resBuscarCampania.data.campaigns[i].status;
              campania.action = this.resBuscarCampania.data.campaigns[i].action;
              campania.image = this.resBuscarCampania.data.campaigns[i].image; 

              this.lstCampanias.push(campania);

              this.totalRecords = this.resBuscarCampania.data.totalItems;
            }
          }
          this.svLogin.refreshToken();
        },
        (res) => {
          this.selectedCampania = {};

          this.sendCampaniaUnSelect.emit(this.selectedCampania);

          if(res.status == 401){
            this.svLogin.userLogout();
          }
          console.log('error ' + JSON.stringify(res.status));
        }
      );
    }
  }

  limpiar() {
    this.busquedaCampaniasForm.patchValue({
      busquedaCampania: ''
    });
  }

  paginate(event) {

    this.first = event.first;
    this.reqBuscarCampania = {};
    this.lstCampanias = []; 
    let campania: RequestCrearCampaniaDTO = {};
    
    this.reqBuscarCampania.text = this.busquedaCampaniasForm.get('busquedaCampania').value;
    this.reqBuscarCampania.page = String(event.page == 0 ? 0 : event.page);
    this.reqBuscarCampania.size = "5";

    if(this.reqBuscarCampania.text != null && this.reqBuscarCampania.text.trim() != ""){
      this.svBuscarCampania.buscarCampaniaText(this.reqBuscarCampania).subscribe(
        (res) => {
          this.resBuscarCampania = res;

          if(this.resBuscarCampania.status.code == "SUCCESS"){
            if(this.resBuscarCampania.data.campaigns != null && this.resBuscarCampania.data.campaigns.length > 0){
              for(let i= 0; i < this.resBuscarCampania.data.campaigns.length; i++){
                campania = {};
  
                campania.campaignId = this.resBuscarCampania.data.campaigns[i].campaignId;
                campania.campaignCode = this.resBuscarCampania.data.campaigns[i].campaignCode;
                campania.campaignName = this.resBuscarCampania.data.campaigns[i].campaignName;
                campania.campaignDescription = this.resBuscarCampania.data.campaigns[i].campaignDescription;
                campania.discount = this.resBuscarCampania.data.campaigns[i].discount;
                campania.startDate = this.resBuscarCampania.data.campaigns[i].startDate; 
                campania.endDate = this.resBuscarCampania.data.campaigns[i].endDate;
                campania.status = this.resBuscarCampania.data.campaigns[i].status;
                campania.action = this.resBuscarCampania.data.campaigns[i].action;
                campania.image = this.resBuscarCampania.data.campaigns[i].image;       
  
                this.lstCampanias.push(campania);
  
                this.totalRecords = this.resBuscarCampania.data.totalItems;
              }
            }
            this.svLogin.refreshToken();

            this.limpiar();
          }else {
            alert(this.resBuscarCampania.status.description);

            this.limpiar();
          }
        },
        (res) => {
          this.selectedCampania = {};

          this.sendCampaniaUnSelect.emit(this.selectedCampania);
          
          if(res.status == 401){
            this.svLogin.userLogout();
          }else if(res.error.status.code == "ERROR"){
            alert("No se encontró ningna campaña con ese texto");
          }
        }
      );
    }else{
      this.svBuscarCampania.buscarCampañas(this.reqBuscarCampania).subscribe(
        (res) => {
          this.resBuscarCampania = res;

          if(this.resBuscarCampania.data.campaigns != null && this.resBuscarCampania.data.campaigns.length > 0){
            for(let i= 0; i < this.resBuscarCampania.data.campaigns.length; i++){
              campania = {};
              
              campania.campaignId = this.resBuscarCampania.data.campaigns[i].campaignId;
              campania.campaignCode = this.resBuscarCampania.data.campaigns[i].campaignCode;
              campania.campaignName = this.resBuscarCampania.data.campaigns[i].campaignName;
              campania.campaignDescription = this.resBuscarCampania.data.campaigns[i].campaignDescription;
              campania.discount = this.resBuscarCampania.data.campaigns[i].discount;
              campania.startDate = this.resBuscarCampania.data.campaigns[i].startDate; 
              campania.endDate = this.resBuscarCampania.data.campaigns[i].endDate;
              campania.status = this.resBuscarCampania.data.campaigns[i].status;
              campania.action = this.resBuscarCampania.data.campaigns[i].action;
              campania.image = this.resBuscarCampania.data.campaigns[i].image; 

              this.lstCampanias.push(campania);

              this.totalRecords = this.resBuscarCampania.data.totalItems;
            }
          }
          this.svLogin.refreshToken();
        },
        (res) => {
          this.selectedCampania = {};

          this.sendCampaniaUnSelect.emit(this.selectedCampania);

          if(res.status == 401){
            this.svLogin.userLogout();
          }
          console.log('error ' + JSON.stringify(res.status));
        }
      );
    }
  }

  onRowSelect(event) {
    let codigoCampania = this.selectedCampania.campaignCode;
    let idCampania = this.selectedCampania.campaignId;

    if((codigoCampania != null && codigoCampania != "")
       && (idCampania != null && idCampania != "")){
      this.selectedCampania = {};
      this.selectedProductosCampania = {};
      this.selectedProductosCampania.campaign = {};

      this.svBuscarCampania.buscarDetalleCampaña(codigoCampania).subscribe(
        (res) => {
          this.resBuscarCampania = res;

          if(this.resBuscarCampania.status.code == "SUCCESS"){
            if(this.resBuscarCampania.campaing){
              this.selectedCampania.campaignId = this.resBuscarCampania.campaing.campaignId;
              this.selectedCampania.campaignCode = this.resBuscarCampania.campaing.campaignCode;
              this.selectedCampania.campaignName = this.resBuscarCampania.campaing.campaignName;
              this.selectedCampania.campaignDescription = this.resBuscarCampania.campaing.campaignDescription;
              this.selectedCampania.discount = this.resBuscarCampania.campaing.discount;
              this.selectedCampania.startDate = this.resBuscarCampania.campaing.startDate;
              this.selectedCampania.endDate = this.resBuscarCampania.campaing.endDate;
              this.selectedCampania.status = this.resBuscarCampania.campaing.status;
              this.selectedCampania.action = this.resBuscarCampania.campaing.action; 
              this.selectedCampania.image = this.resBuscarCampania.campaing.image;
            }
          }

          this.sendCampaniaSelect.emit(this.selectedCampania);

          this.svLogin.refreshToken();
        },
        (res) => {
          this.selectedCampania = {};

          this.sendCampaniaUnSelect.emit(this.selectedCampania);

          if(res.status == 401){
            this.svLogin.userLogout();
          }
          console.log('error ' + JSON.stringify(res.status));
        }
      );

      this.reqBuscarProductoCampania = {};
      
      this.reqBuscarProductoCampania.page = "0";
      this.reqBuscarProductoCampania.size = "5";
      this.reqBuscarProductoCampania.text = idCampania;

      //Servicio de Productos Campaña
      this.svBuscarCampania.buscarProductoCampaña(this.reqBuscarProductoCampania).subscribe(
        (res) => {
          this.resBuscarProductoCampania = res;

          if(this.resBuscarProductoCampania.status.code == "SUCCESS"){
            if(this.resBuscarProductoCampania.campaign){
              this.selectedProductosCampania.campaign = this.resBuscarProductoCampania.campaign;
            }
          }
          this.sendProductosCampaniaSelect.emit(this.selectedProductosCampania);

          this.svLogin.refreshToken();
        },
        (res) => {

          this.selectedProductosCampania = {};

          this.sendProductosCampaniaSelect.emit(this.selectedProductosCampania);

          if(res.status == 401){
            this.svLogin.userLogout();
          }
          console.log('error ' + JSON.stringify(res.status));
        }
      );
    }
  }

  onRowUnselect(event) {
    this.selectedCampania = {};

    this.sendCampaniaUnSelect.emit(this.selectedCampania);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.sendEventUpdateTable.currentValue) {
      this.reqBuscarCampania = {};
      this.lstCampanias = []; 
      let campania: RequestCrearCampaniaDTO = {};
      
      this.reqBuscarCampania.text = "";
      this.reqBuscarCampania.page = "0";
      this.reqBuscarCampania.size = "5";

      this.svBuscarCampania.buscarCampañas(this.reqBuscarCampania).subscribe(
        (res) => {
          this.resBuscarCampania = res;

          if(this.resBuscarCampania.data.campaigns != null && this.resBuscarCampania.data.campaigns.length > 0){
            for(let i= 0; i < this.resBuscarCampania.data.campaigns.length; i++){
              campania = {};
              
              campania.campaignId = this.resBuscarCampania.data.campaigns[i].campaignId;
              campania.campaignCode = this.resBuscarCampania.data.campaigns[i].campaignCode;
              campania.campaignName = this.resBuscarCampania.data.campaigns[i].campaignName;
              campania.campaignDescription = this.resBuscarCampania.data.campaigns[i].campaignDescription;
              campania.discount = this.resBuscarCampania.data.campaigns[i].discount;
              campania.startDate = this.resBuscarCampania.data.campaigns[i].startDate; 
              campania.endDate = this.resBuscarCampania.data.campaigns[i].endDate;
              campania.status = this.resBuscarCampania.data.campaigns[i].status;
              campania.action = this.resBuscarCampania.data.campaigns[i].action;
              campania.image = this.resBuscarCampania.data.campaigns[i].image; 

              this.lstCampanias.push(campania);

              this.totalRecords = this.resBuscarCampania.data.totalItems;
            }
          }
          this.svLogin.refreshToken();
        },
        (res) => {
          this.selectedCampania = {};

          this.sendCampaniaUnSelect.emit(this.selectedCampania);

          if(res.status == 401){
            this.svLogin.userLogout();
          }
          console.log('error ' + JSON.stringify(res.status));
        }
      );
    }
  }

}