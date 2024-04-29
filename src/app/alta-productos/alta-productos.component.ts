import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from '../_servicio/productos.service';
import { Producto } from '../_modelo/Producto';

@Component({
  selector: 'app-alta-productos',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './alta-productos.component.html',
  styleUrl: './alta-productos.component.css'
})
export class AltaProductosComponent implements OnInit {
  form:FormGroup;
  id:number = 0;
  edicion:boolean=false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private servicio: ProductosService
  ) {
    this.form = new FormGroup({
      idProducto: new FormControl(''), 
      nombreProducto: new FormControl(''),
      cantidad: new FormControl(''),
      precioUnitario: new FormControl(''),
      id_supplier: new FormControl(''),
      id_categoria: new FormControl(''),
      unidadesStock:new FormControl(''),
      enPedido: new FormControl(''),
      volverAPedir:new FormControl(''),
      discontinua:new FormControl('')
    });}

  ngOnInit(): void {
    

    this.route.params
      .subscribe(data => {
      this.id = data['id'];
      this.edicion= data['id'] != null;
      this.formaFormulario();

  });
}
  formaFormulario() {
    if(this.edicion){
      this.servicio.listarPorId(this.id)
        .subscribe(data => {
          this.form = new FormGroup({
            'idProducto': new FormControl(data.idProducto),
            'nombre': new FormControl(data.nombreProducto),
            'cantidad': new FormControl(data.cantidad),
            'precioUnitario':new FormControl(data.precioUnitario),
            'id_supplier': new FormControl(data.id_supplier),
            'id_categoria': new FormControl(data.id_categoria),
            'unidadesStock':new FormControl(data.unidadesStock),
            'enPedido': new FormControl(data.enPedido),
            'volverAPedir':new FormControl(data.volverAPedir),
            'discontinua':new FormControl(data.discontinua)

          });
        })
    }
  }
  
operar(){
  let p:Producto = {
    'idProducto': this.form.value['idProducto'],
    'nombreProducto': this.form.value['nombreProducto'],
    'cantidad': this.form.value['cantidad'],
    'precioUnitario': this.form.value['precioUnitario'],
    'id_supplier': this.form.value['id_supplier'],
    'id_categoria': this.form.value['id_categoria'],
    'unidadesStock': this.form.value['unidadesStock'],
    'enPedido': this.form.value['enPedido'],
    'volverAPedir': this.form.value['volverAPedir'],
    'discontinua': this.form.value['discontinua']

  }
  if(this.edicion){
   
    this.servicio.modificar(p)
      .subscribe(()=>{
        this.servicio.listar()
          .subscribe(data=>{
            this.servicio.productoCambio.next(data);
          });
      });
  }else{
    this.servicio.alta(p)
      .subscribe(()=>{
        this.servicio.listar()
          .subscribe(data => {
            this.servicio.productoCambio.next(data);
          });
      });
  }
  this.router.navigate([''])
}
}
