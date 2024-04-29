import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductosService } from '../_servicio/productos.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modificar-productos',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modificar-productos.component.html',
  styleUrl: './modificar-productos.component.css'
})
export class ModificarProductosComponent {
  form: FormGroup;
  id: number = 0;

  constructor(
    private productosService: ProductosService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = new FormGroup({
      idProducto: new FormControl('', Validators.required),
      nombreProducto: new FormControl('', Validators.required),
      cantidad: new FormControl('', Validators.required),
      precioUnitario: new FormControl('', Validators.required),
      id_supplier: new FormControl('', Validators.required),
      id_categoria: new FormControl ('', Validators.required),
      unidadesStock: new FormControl ('', Validators.required),
      enPedido: new FormControl('', Validators.required),
      volverAPedir: new FormControl ('', Validators.required),
      discontinua: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.cargarDatosProducto(this.id);
    });
  }

  cargarDatosProducto(id: number) {
    this.productosService.listarPorId(id).subscribe(producto => {
      this.form.setValue({
        idProducto: producto.idProducto,
        nombreProducto: producto.nombreProducto,
        cantidad: producto.cantidad,
        precioUnitario: producto.precioUnitario,
        id_supplier: producto.id_supplier,
        id_categoria: producto.id_categoria,
        unidadesStock: producto.unidadesStock,
        enPedido: producto.enPedido,
        volverAPedir: producto.volverAPedir,
        discontinua: producto.discontinua
      });
    });
  }

  modificarProducto() {
    if (this.form.valid) {
      this.productosService.modificar(this.form.value).subscribe({
        next: () => {
          this.router.navigate(['']);
          
        }
      });
    }
  }
}
