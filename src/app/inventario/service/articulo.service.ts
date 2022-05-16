import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Articulo, Pagination } from '../interfaces/inventario.interface';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {
  baseUrl:string = environment.baseUrl;

  constructor(private http:HttpClient) { }

  getAllArticulos(page:Number):Observable<Pagination>{//quitar el size
    const url = `${this.baseUrl}/api/v1/articulos?page=${page}`;
    return this.http.get<Pagination>(url)
  }

  saveArticulo(articulo:Articulo):Observable<Articulo>{
    const url = `${this.baseUrl}/api/v1/articulos`;
    return this.http.post<Articulo>(url,articulo)
  }

  updateArticulo(articulo:Articulo):Observable<Articulo>{
    const url = `${this.baseUrl}/api/v1/articulos/${articulo.id}`;
    return this.http.put<Articulo>(url,articulo)
  }

  deleteArticulo(id:number):Observable<any>{
    const url = `${this.baseUrl}/api/v1/articulos/${id}`;
    return this.http.delete<any>(url)
  }

  searchArticulos(termino:string):Observable<Articulo[]>{
    const url = `${this.baseUrl}/api/v1/articulos/search/${termino}`;
    return this.http.get<Articulo[]>(url)
  }
}
