import { Routes } from '@angular/router';
import { ListarProductosComponent } from './lista-productos/lista-productos.component';
import { AltaProductosComponent } from './alta-productos/alta-productos.component';
import { EliminarProductosComponent } from './eliminar-productos/eliminar-productos.component';
import { ModificarProductosComponent } from './modificar-productos/modificar-productos.component';


export const routes: Routes = [
    { 
      path: '', component: ListarProductosComponent, children:[ 
        { path: 'alta', component: AltaProductosComponent },
        { path: 'modificar/:id', component: ModificarProductosComponent } 
      ]
      },
];
