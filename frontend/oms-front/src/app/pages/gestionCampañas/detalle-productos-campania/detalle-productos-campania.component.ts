import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { RequestBuscarProductoDTO } from 'src/app/models/RequestBuscarProductoDTO';
import { RequestCrearCampaniaDTO } from 'src/app/models/RequestCrearCampaniaDTO';
import { ResponseBuscarProductoCampaniaDTO } from 'src/app/models/ResponseBuscarProductoCampaniaDTO';
import { BuscarCampaniaService } from 'src/app/services/campania/buscar-campania.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-detalle-productos-campania',
  templateUrl: './detalle-productos-campania.component.html',
  styles: []
})
export class DetalleProductosCampaniaComponent implements OnInit {

  reqBuscarProductoCampania: RequestBuscarProductoDTO;
  resBuscarProductoCampania: ResponseBuscarProductoCampaniaDTO;
  lstProductoCampania: RequestCrearCampaniaDTO[] = [];
  totalRecords: number;
  first: number;
  idCampania: string;

  visibilidadTabla: Boolean = false;

  @Input() productosCampania: ResponseBuscarProductoCampaniaDTO;

  constructor(private svBuscarProductosCampania: BuscarCampaniaService,
              private svLogin: LoginService) {
      
  }

  ngOnInit() {
  } 

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.productosCampania.currentValue) {

      this.lstProductoCampania = [];
      this.totalRecords = 0;
      this.first = 0;
      this.idCampania = "";

      let productosCampania: ResponseBuscarProductoCampaniaDTO = changes.productosCampania.currentValue;

      if(productosCampania != null && productosCampania.campaign != null
      && productosCampania.campaign.data != null && productosCampania.campaign.data.products != null){
        
        this.lstProductoCampania = productosCampania.campaign.data.products;
        this.totalRecords = productosCampania.campaign.data.totalItems;
        this.first = productosCampania.campaign.data.currentPage;
        this.idCampania = productosCampania.campaign.id;

        this.visibilidadTabla = true;

      }else{
        this.visibilidadTabla = false;  
      }
    }
  }

  paginate(event) {
    this.first = event.first;

    this.reqBuscarProductoCampania = {};
    this.lstProductoCampania = []; 
    
    this.reqBuscarProductoCampania.text = this.idCampania;
    this.reqBuscarProductoCampania.page = String(event.page == 0 ? 0 : event.page);
    this.reqBuscarProductoCampania.size = "5";

    //Servicio de Productos Campaña
    this.svBuscarProductosCampania.buscarProductoCampaña(this.reqBuscarProductoCampania).subscribe(
      (res) => {
        this.resBuscarProductoCampania = res;

        if(this.resBuscarProductoCampania.status.code == "SUCCESS"){
          if(this.resBuscarProductoCampania.campaign != null && this.resBuscarProductoCampania.campaign.data != null
            && this.resBuscarProductoCampania.campaign.data.products != null){
            this.lstProductoCampania = this.resBuscarProductoCampania.campaign.data.products;

            this.totalRecords = this.resBuscarProductoCampania.campaign.data.totalItems;
          }
        }

        this.svLogin.refreshToken();
      },
      (res) => {

        if(res.status == 401){
          this.svLogin.userLogout();
        }
        console.log('error ' + JSON.stringify(res.status));
      }
    );
  }

}
