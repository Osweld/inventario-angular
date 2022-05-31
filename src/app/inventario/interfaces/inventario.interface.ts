export interface Marca {
  id: number;
  nombre: string;
  descripcion: string;
}

export interface Categoria {
  id: number;
  nombre: string;
  descripcion: string;
}

export interface Articulo{
id:number;
nombre:string;
descripcion:string;
stock:number;
codigo:string;
precio:number;
costo:number;
activo:boolean;
categoria:Categoria;
marca:Marca

}

export interface Pagination {
  data:any;
  totalPages: number;
  page: number;
  totalElements: number;
}

export interface ErrorResponse{
  code: number
  message: string
  path: string
  status: string
  timestamp: Date
  validations: Validation;
}

export interface Validation{
  unique:string
}
