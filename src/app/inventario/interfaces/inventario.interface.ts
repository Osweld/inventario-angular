export interface Marca {
  id: number;
  nombre: string;
  descripcion: string;
}

export interface Pagination {
  data:any;
  totalPages: number;
  page: number;
  totalElements: number;
}
