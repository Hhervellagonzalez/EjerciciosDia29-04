import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListarProductosComponent } from './lista-productos/lista-productos.component';
import { AltaProductosComponent } from './alta-productos/alta-productos.component';
import { EliminarProductosComponent } from './eliminar-productos/eliminar-productos.component';
import { ModificarProductosComponent } from './modificar-productos/modificar-productos.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ListarProductosComponent,AltaProductosComponent,EliminarProductosComponent,ModificarProductosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EjerciciosDia29-04';
}
