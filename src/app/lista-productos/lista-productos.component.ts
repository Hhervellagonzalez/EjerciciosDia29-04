import { Component, OnInit } from '@angular/core';
import { Producto } from '../_modelo/Producto';
import { ProductosService } from '../_servicio/productos.service';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './lista-productos.component.html',
  styleUrl: './lista-productos.component.css'
})
export class ListarProductosComponent implements OnInit {
  productos: Producto[] = [];

  constructor(private productosService: ProductosService) { }

  ngOnInit(): void {
    this.productosService.productoCambio
    .subscribe((data) => {this.productos = data}
    )
    
    this.productosService.listar()
       .subscribe(datos => {
          this.productos = datos;
          console.log("entra");

       })
  }

  eliminar(id:number){
    this.productosService.eliminar(id)
      .subscribe(()=>
        {
          this.productosService.listar()
            .subscribe(data=>this.productosService.productoCambio.next(data))
        })
  }

  recibirAviso(listaActualizada:Observable<Producto[]>){
      console.warn("regresa el padre ----")
      this.productosService.listar()
      .subscribe(datos => {
         this.productos = datos;
         console.log("entra");
      })
  }
}
