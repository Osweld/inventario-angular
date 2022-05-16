import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Marca, Pagination } from '../interfaces/inventario.interface';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  baseUrl:string = environment.baseUrl;

  constructor(private http:HttpClient) { }

  getAllMarcas(page:Number):Observable<Pagination>{
    const url = `${this.baseUrl}/api/v1/marcas?page=${page}`;
    return this.http.get<Pagination>(url)
  }

  saveMarca(marca:Marca):Observable<Marca>{
    const url = `${this.baseUrl}/api/v1/marcas`;
    return this.http.post<Marca>(url,marca)
  }

  updateMarca(marca:Marca):Observable<Marca>{
    const url = `${this.baseUrl}/api/v1/marcas/${marca.id}`;
    return this.http.put<Marca>(url,marca)
  }

  deleteMarca(id:number):Observable<any>{
    const url = `${this.baseUrl}/api/v1/marcas/${id}`;
    return this.http.delete<any>(url)
  }

  searchMarcas(termino:string):Observable<Marca[]>{
    const url = `${this.baseUrl}/api/v1/marcas/search/${termino}`;
    return this.http.get<Marca[]>(url)
  }
}
