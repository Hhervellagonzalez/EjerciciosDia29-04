import { Injectable } from '@angular/core';
import { entorno } from '../_entorno/entorno';
import { Observable, Subject, map } from 'rxjs';
import { Producto } from '../_modelo/Producto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private url: string = `${entorno.HOST}/productos`;
  private productosLista: Producto[] = [];
  productoCambio = new Subject<Producto[]>();
  mensajeCambio = new Subject<string>();


  constructor(private http: HttpClient) { }

  listar():Observable<Producto[]>{
    return this.http.get<Producto[]>(this.url)
    .pipe(map(data => {return data.sort((a,b) =>a.idProducto-b.idProducto);
    })
    );
  }

  listarPorId(id:number){
    return this.http.get<Producto>(`${this.url}/${id}`);
  }


  obtenerTodos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url);
  }
  alta(producto: Producto): Observable<Producto> {
    console.log(producto)
    return this.http.post<Producto>(this.url, producto);
  }
  modificar(p: Producto): Observable<Producto> {
    return this.http.put<Producto>(this.url, p);
  }
  eliminar(id: number): Observable<any> {
    const urlEliminar = `${this.url}/${id}`;
    return this.http.delete(urlEliminar);
  }
}
