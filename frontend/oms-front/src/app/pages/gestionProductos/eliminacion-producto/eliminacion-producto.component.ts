import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestCrearProductoDTO } from 'src/app/models/RequestCrearProductoDTO';
import { ResponseCrearProductDTO } from 'src/app/models/ResponseCrearProductDTO';
import { LoginService } from 'src/app/services/login/login.service';
import { EliminarProductoService } from 'src/app/services/producto/eliminar-producto.service';
import { DetalleProductoComponent } from '../detalle-producto/detalle-producto.component';

@Component({
  selector: 'app-eliminacion-producto',
  templateUrl: './eliminacion-producto.component.html',
  styles: []
})
export class EliminacionProductoComponent implements OnInit {

  producto: RequestCrearProductoDTO;
  visibilidadDetalle:Boolean;

  formDataDetalleProducto: FormGroup;

  responseDeleteProducto: ResponseCrearProductDTO;

  constructor(private svEliminarProducto: EliminarProductoService,
              private svLogin: LoginService,
              private router: Router) { 

  } 

  ngOnInit(): void {

  }

  onRowSelect(producto: RequestCrearProductoDTO) {
    this.producto = producto;
    this.visibilidadDetalle = true;
  }
  
  onRowUnselect(producto: RequestCrearProductoDTO) {
    this.producto = producto;
    this.visibilidadDetalle = false;
  }

  showFormDataDetalle(componentDetalleProducto: DetalleProductoComponent) { 
    this.formDataDetalleProducto = componentDetalleProducto.detalleProductosForm;
  }

  eliminar() {
    //Se prepara los datos del producto

    let producto: RequestCrearProductoDTO = {};
    let fechaInicio: string = "";
    let fechaFin: string = "";

    fechaInicio = formatDate(this.formDataDetalleProducto.get('fechaInicial').value, 'yyyy-MM-dd', 'en-US');
    fechaFin = formatDate(this.formDataDetalleProducto.get('fechaFinal').value, 'yyyy-MM-dd', 'en-US');

    producto.productId = this.formDataDetalleProducto.get("idProducto").value;
    producto.productCode = this.formDataDetalleProducto.get("codigo").value;
    producto.productName = this.formDataDetalleProducto.get("nombre").value;
    producto.productDescription = this.formDataDetalleProducto.get("descripcion").value;
    producto.startDate = fechaInicio;
    producto.endDate = fechaFin;
    producto.productPrice = this.formDataDetalleProducto.get("precio").value;
    producto.originCity = this.formDataDetalleProducto.get("ciudadOrigen").value;
    producto.destinationCity = this.formDataDetalleProducto.get("ciudadDestino").value;
    producto.image = this.formDataDetalleProducto.get("imagen").value;
    producto.vendorId = this.formDataDetalleProducto.get("tipoProveedor").value;
    producto.type = this.formDataDetalleProducto.get("tipoProductoNV").value;

    //Llamar servicio eliminar producto
    this.svEliminarProducto.deleteProduct(producto).subscribe(

      (res) => {
        this.responseDeleteProducto = res;

        if(this.responseDeleteProducto.status == "DELETED"){
          alert("Producto Eliminado !!!");
          this.svLogin.refreshToken();
          this.visibilidadDetalle = false;
          this.router.navigate(['eliminarProducto']);  
        }  
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
