import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categoria, Pagination } from '../interfaces/inventario.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  baseUrl:string = environment.baseUrl;

  constructor(private http:HttpClient) { }

  getAllCategorias(page:Number):Observable<Pagination>{//quitar el size
    const url = `${this.baseUrl}/api/v1/categorias?page=${page}`;
    return this.http.get<Pagination>(url)
  }

  saveCategoria(categoria:Categoria):Observable<Categoria>{
    const url = `${this.baseUrl}/api/v1/categorias`;
    return this.http.post<Categoria>(url,categoria)
  }

  updateCategoria(categoria:Categoria):Observable<Categoria>{
    const url = `${this.baseUrl}/api/v1/categorias/${categoria.id}`;
    return this.http.put<Categoria>(url,categoria)
  }

  deleteCategoria(id:number):Observable<any>{
    const url = `${this.baseUrl}/api/v1/categorias/${id}`;
    return this.http.delete<any>(url)
  }

  searcCategorias(termino:string):Observable<Categoria[]>{
    const url = `${this.baseUrl}/api/v1/categorias/search/${termino}`;
    return this.http.get<Categoria[]>(url)
  }
}

