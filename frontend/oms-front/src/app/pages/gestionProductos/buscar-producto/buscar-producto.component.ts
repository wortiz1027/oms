import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { RequestBuscarProductoDTO } from 'src/app/models/RequestBuscarProductoDTO';
import { RequestCrearProductoDTO } from 'src/app/models/RequestCrearProductoDTO';
import { ResponseBuscarProductoDTO } from 'src/app/models/ResponseBuscarProductoDTO';
import { LoginService } from 'src/app/services/login/login.service';
import { BuscarProductoService } from 'src/app/services/producto/buscar-producto.service';

import { Paginator } from 'primeng/paginator';

@Component({
  selector: 'app-buscar-producto',
  templateUrl: './buscar-producto.component.html'
})

export class BuscarProductoComponent implements OnInit {
  reqBuscarProducto: RequestBuscarProductoDTO;
  resBuscarProducto: ResponseBuscarProductoDTO;
  lstProductos: RequestCrearProductoDTO[];
  totalRecords: number;
  first: number = 0;

  @Output() sendProductoSelect = new EventEmitter<RequestCrearProductoDTO>();
  @Output() sendProductoUnSelect = new EventEmitter<RequestCrearProductoDTO>();

  selectedProducto: RequestCrearProductoDTO;

  @ViewChild('paginator', { static: true }) paginator: Paginator;

  @Input() sendEventUpdateTable: String;

  constructor(private formBuilder: FormBuilder,
    private svBuscarProducto: BuscarProductoService,
    private svLogin: LoginService
  ) {

  }

  busquedaProductosForm = this.formBuilder.group({
    busquedaProducto: ['']
  });

  ngOnInit() {
    this.lstProductos = [];
  }

  buscar() {
    this.reqBuscarProducto = {};
    this.lstProductos = [];
    let producto: RequestCrearProductoDTO = {};

    this.reqBuscarProducto.text = this.busquedaProductosForm.get('busquedaProducto').value;
    this.reqBuscarProducto.page = "0";
    this.reqBuscarProducto.size = "5";
    this.reqBuscarProducto.token = this.svLogin.getToken().valueOf();

    if (this.reqBuscarProducto.text != null && this.reqBuscarProducto.text.trim() != "") {
      this.svBuscarProducto.buscarProductoText(this.reqBuscarProducto).subscribe(
        (res) => {
          this.resBuscarProducto = res;

          if (this.resBuscarProducto.status.code == "SUCCESS") {
            if (this.resBuscarProducto.data.products != null && this.resBuscarProducto.data.products.length > 0) {
              for (let i = 0; i < this.resBuscarProducto.data.products.length; i++) {
                producto = {};

                producto.productId = this.resBuscarProducto.data.products[i].productId;
                producto.productCode = this.resBuscarProducto.data.products[i].productCode;
                producto.productName = this.resBuscarProducto.data.products[i].productName;
                producto.productDescription = this.resBuscarProducto.data.products[i].productDescription;
                producto.productPrice = this.resBuscarProducto.data.products[i].productPrice;
                producto.originCity = this.resBuscarProducto.data.products[i].originCity;
                producto.destinationCity = this.resBuscarProducto.data.products[i].destinationCity;
                producto.startDate = this.resBuscarProducto.data.products[i].startDate;
                producto.endDate = this.resBuscarProducto.data.products[i].endDate;
                producto.type = this.resBuscarProducto.data.products[i].type;
                producto.image = this.resBuscarProducto.data.products[i].image;
                producto.vendorId = this.resBuscarProducto.data.products[i].vendorId;
                producto.vendor = this.resBuscarProducto.data.products[i].vendor;

                this.lstProductos.push(producto);

                this.totalRecords = this.resBuscarProducto.data.totalItems;
              }
            }
            this.svLogin.refreshToken();

            this.limpiar();
          } else {
            alert(this.resBuscarProducto.status.description);

            this.limpiar();
          }
        },
        (res) => {
          this.selectedProducto = {};

          this.sendProductoUnSelect.emit(this.selectedProducto);

          if (res.status == 401) {
            this.svLogin.userLogout();
          } else if (res.error.status.code == "ERROR") {
            alert("No se encontró ningún producto con ese texto");
          }
        }
      );
    } else {
      this.svBuscarProducto.buscarProductos(this.reqBuscarProducto).subscribe(
        (res) => {
          this.resBuscarProducto = res;

          if (this.resBuscarProducto.data.products != null && this.resBuscarProducto.data.products.length > 0) {
            for (let i = 0; i < this.resBuscarProducto.data.products.length; i++) {
              producto = {};

              producto.productId = this.resBuscarProducto.data.products[i].productId;
              producto.productCode = this.resBuscarProducto.data.products[i].productCode;
              producto.productName = this.resBuscarProducto.data.products[i].productName;
              producto.productDescription = this.resBuscarProducto.data.products[i].productDescription;
              producto.productPrice = this.resBuscarProducto.data.products[i].productPrice;
              producto.originCity = this.resBuscarProducto.data.products[i].originCity;
              producto.destinationCity = this.resBuscarProducto.data.products[i].destinationCity;
              producto.startDate = this.resBuscarProducto.data.products[i].startDate;
              producto.endDate = this.resBuscarProducto.data.products[i].endDate;
              producto.type = this.resBuscarProducto.data.products[i].type;
              producto.image = this.resBuscarProducto.data.products[i].image;
              producto.vendorId = this.resBuscarProducto.data.products[i].vendorId;
              producto.vendor = this.resBuscarProducto.data.products[i].vendor;

              this.lstProductos.push(producto);

              this.totalRecords = this.resBuscarProducto.data.totalItems;
            }
          }
          this.svLogin.refreshToken();
        },
        (res) => {
          this.selectedProducto = {};

          this.sendProductoUnSelect.emit(this.selectedProducto);

          if (res.status == 401) {
            this.svLogin.userLogout();
          }
          console.log('error ' + JSON.stringify(res.status));
        }
      );
    }

  }

  limpiar() {
    this.busquedaProductosForm.patchValue({
      busquedaProducto: ''
    });
  }

  paginate(event) {
    this.first = event.first;

    this.reqBuscarProducto = {};
    this.lstProductos = [];
    let producto: RequestCrearProductoDTO = {};

    this.reqBuscarProducto.text = this.busquedaProductosForm.get('busquedaProducto').value;
    this.reqBuscarProducto.page = String(event.page == 0 ? 0 : event.page);
    this.reqBuscarProducto.size = "5";
    this.reqBuscarProducto.token = this.svLogin.getToken().valueOf();

    if (this.reqBuscarProducto.text != null && this.reqBuscarProducto.text.trim() != "") {
      this.svBuscarProducto.buscarProductoText(this.reqBuscarProducto).subscribe(
        (res) => {
          this.resBuscarProducto = res;

          if (this.resBuscarProducto.status.code == "SUCCESS") {
            if (this.resBuscarProducto.data.products != null && this.resBuscarProducto.data.products.length > 0) {
              for (let i = 0; i < this.resBuscarProducto.data.products.length; i++) {
                producto = {};

                producto.productId = this.resBuscarProducto.data.products[i].productId;
                producto.productCode = this.resBuscarProducto.data.products[i].productCode;
                producto.productName = this.resBuscarProducto.data.products[i].productName;
                producto.productDescription = this.resBuscarProducto.data.products[i].productDescription;
                producto.productPrice = this.resBuscarProducto.data.products[i].productPrice;
                producto.originCity = this.resBuscarProducto.data.products[i].originCity;
                producto.destinationCity = this.resBuscarProducto.data.products[i].destinationCity;
                producto.startDate = this.resBuscarProducto.data.products[i].startDate;
                producto.endDate = this.resBuscarProducto.data.products[i].endDate;
                producto.type = this.resBuscarProducto.data.products[i].type;
                producto.image = this.resBuscarProducto.data.products[i].image;
                producto.vendorId = this.resBuscarProducto.data.products[i].vendorId;
                producto.vendor = this.resBuscarProducto.data.products[i].vendor;

                this.lstProductos.push(producto);

                this.totalRecords = this.resBuscarProducto.data.totalItems;
              }
            }
            this.svLogin.refreshToken();

            this.limpiar();
          } else {
            alert(this.resBuscarProducto.status.description);

            this.limpiar();
          }
        },
        (res) => {
          this.selectedProducto = {};

          this.sendProductoUnSelect.emit(this.selectedProducto);

          if (res.status == 401) {
            this.svLogin.userLogout();
          }
          console.log('error ' + JSON.stringify(res.status));
        }
      );
    } else {
      this.svBuscarProducto.buscarProductos(this.reqBuscarProducto).subscribe(
        (res) => {
          this.resBuscarProducto = res;

          if (this.resBuscarProducto.data.products != null && this.resBuscarProducto.data.products.length > 0) {
            for (let i = 0; i < this.resBuscarProducto.data.products.length; i++) {
              producto = {};

              producto.productId = this.resBuscarProducto.data.products[i].productId;
              producto.productCode = this.resBuscarProducto.data.products[i].productCode;
              producto.productName = this.resBuscarProducto.data.products[i].productName;
              producto.productDescription = this.resBuscarProducto.data.products[i].productDescription;
              producto.productPrice = this.resBuscarProducto.data.products[i].productPrice;
              producto.originCity = this.resBuscarProducto.data.products[i].originCity;
              producto.destinationCity = this.resBuscarProducto.data.products[i].destinationCity;
              producto.startDate = this.resBuscarProducto.data.products[i].startDate;
              producto.endDate = this.resBuscarProducto.data.products[i].endDate;
              producto.type = this.resBuscarProducto.data.products[i].type;
              producto.image = this.resBuscarProducto.data.products[i].image;
              producto.vendorId = this.resBuscarProducto.data.products[i].vendorId;
              producto.vendor = this.resBuscarProducto.data.products[i].vendor;

              this.lstProductos.push(producto);

              this.totalRecords = this.resBuscarProducto.data.totalItems;
            }
          }
          this.svLogin.refreshToken();
        },
        (res) => {
          this.selectedProducto = {};

          this.sendProductoUnSelect.emit(this.selectedProducto);

          if (res.status == 401) {
            this.svLogin.userLogout();
          }
          console.log('error ' + JSON.stringify(res.status));
        }
      );
    }

  }

  onRowSelect(event) {
    let codigoProducto = this.selectedProducto.productCode;

    if (codigoProducto != null && codigoProducto != "") {
      this.selectedProducto = {};

      this.svBuscarProducto.buscarDetalleProducto(codigoProducto).subscribe(
        (res) => {
          this.resBuscarProducto = res;

          if (this.resBuscarProducto.status.code == "SUCCESS") {
            if (this.resBuscarProducto.product) {
              this.selectedProducto.productId = this.resBuscarProducto.product.productId;
              this.selectedProducto.productCode = this.resBuscarProducto.product.productCode;
              this.selectedProducto.productName = this.resBuscarProducto.product.productName;
              this.selectedProducto.productDescription = this.resBuscarProducto.product.productDescription;
              this.selectedProducto.productPrice = this.resBuscarProducto.product.productPrice;
              this.selectedProducto.originCity = this.resBuscarProducto.product.originCity;
              this.selectedProducto.destinationCity = this.resBuscarProducto.product.destinationCity;
              this.selectedProducto.startDate = this.resBuscarProducto.product.startDate;
              this.selectedProducto.endDate = this.resBuscarProducto.product.endDate;
              this.selectedProducto.type = this.resBuscarProducto.product.type;
              this.selectedProducto.image = this.resBuscarProducto.product.image;
              this.selectedProducto.vendorId = this.resBuscarProducto.product.vendorId;
              this.selectedProducto.vendor = this.resBuscarProducto.product.vendor;
            }
          }

          this.sendProductoSelect.emit(this.selectedProducto);

          this.svLogin.refreshToken();
        },
        (res) => {
          this.selectedProducto = {};

          this.sendProductoUnSelect.emit(this.selectedProducto);

          if (res.status == 401) {
            this.svLogin.userLogout();
          }
          console.log('error ' + JSON.stringify(res.status));
        }
      );
    }
  }

  onRowUnselect(event) {
    this.selectedProducto = {};

    this.sendProductoUnSelect.emit(this.selectedProducto);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.sendEventUpdateTable.currentValue) {
      this.reqBuscarProducto = {};
      this.lstProductos = [];
      let producto: RequestCrearProductoDTO = {};

      this.reqBuscarProducto.text = "";
      this.reqBuscarProducto.page = "0";
      this.reqBuscarProducto.size = "5";
      this.reqBuscarProducto.token = this.svLogin.getToken().valueOf();

      this.svBuscarProducto.buscarProductos(this.reqBuscarProducto).subscribe(
        (res) => {
          this.resBuscarProducto = res;

          if (this.resBuscarProducto.data.products != null && this.resBuscarProducto.data.products.length > 0) {
            for (let i = 0; i < this.resBuscarProducto.data.products.length; i++) {
              producto = {};

              producto.productId = this.resBuscarProducto.data.products[i].productId;
              producto.productCode = this.resBuscarProducto.data.products[i].productCode;
              producto.productName = this.resBuscarProducto.data.products[i].productName;
              producto.productDescription = this.resBuscarProducto.data.products[i].productDescription;
              producto.productPrice = this.resBuscarProducto.data.products[i].productPrice;
              producto.originCity = this.resBuscarProducto.data.products[i].originCity;
              producto.destinationCity = this.resBuscarProducto.data.products[i].destinationCity;
              producto.startDate = this.resBuscarProducto.data.products[i].startDate;
              producto.endDate = this.resBuscarProducto.data.products[i].endDate;
              producto.type = this.resBuscarProducto.data.products[i].type;
              producto.image = this.resBuscarProducto.data.products[i].image;
              producto.vendorId = this.resBuscarProducto.data.products[i].vendorId;
              producto.vendor = this.resBuscarProducto.data.products[i].vendor;

              this.lstProductos.push(producto);

              this.totalRecords = this.resBuscarProducto.data.totalItems;
            }
          }
          this.svLogin.refreshToken();
        },
        (res) => {
          this.selectedProducto = {};

          this.sendProductoUnSelect.emit(this.selectedProducto);

          if (res.status == 401) {
            this.svLogin.userLogout();
          }
          console.log('error ' + JSON.stringify(res.status));
        }
      );

    }
  }

}
