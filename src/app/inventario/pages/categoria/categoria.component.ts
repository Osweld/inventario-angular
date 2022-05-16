import { Component, OnInit } from '@angular/core';
import { Categoria, Pagination } from '../../interfaces/inventario.interface';
import { CategoriaService } from '../../service/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  categorias!: Categoria[];
  categoriasBuscador!: Categoria[];
  pagina!: Pagination;
  modalVerActive: boolean = false;
  modalAgregarActive:boolean = false;
  modalEliminarActive:boolean = false;
  mostrarSugerencias:boolean = false;
  titulo: string = "";

  categoria: Categoria = {
    id: 0,
    nombre: "",
    descripcion: ""
  }
  constructor(private categoriaService: CategoriaService) { }



  ngOnInit(): void {
    this.categoriaService.getAllCategorias(0).subscribe(pagina => {
      this.categorias = pagina.data
      this.pagina = pagina
    })
  }

  //Pagination

  nextPage(page: Number) {
    this.categoriaService.getAllCategorias(page).subscribe(pagina => {
      this.categorias = pagina.data
      this.pagina = pagina
    })
  }


  // Operaciones CRUD
  verCategoria(categoria: Categoria) {
    this.modalVerActive = true;
    this.mostrarSugerencias=false
    this.categoria = categoria;
  }

  agregarCategoria() {
    this.categoria = {
      id: 0,
      nombre: "",
      descripcion: ""
    }
    this.titulo = "Agregar Categoria"
    this.modalAgregarActive = true
  }

  editarCategoria(categoria: Categoria) {
    this.categoria = categoria
    this.titulo = "Editar Categoria"
    this.modalAgregarActive = true
  }

  eliminarCategoria(categoria: Categoria) {
    this.modalEliminarActive = true;
    this.categoria = categoria;
  }

  updatePage(isUpdate:boolean){
    if(isUpdate){
      this.categoriaService.getAllCategorias(this.pagina.page).subscribe(pagina => {
        this.categorias = pagina.data
        this.pagina = pagina
      })
    }

  }

  //Buscador
  getCategoriasByTermino(termino:string){
    if(termino !== ""){
      this.categoriaService.searcCategorias(termino).subscribe(
        categorias =>{
            this.categoriasBuscador = categorias;
            this.mostrarSugerencias = true
        }
      )
    }else{
      this.mostrarSugerencias = false
    }

  }



  //Cerrar modales
  closeVerModal(close:boolean){
    this.modalVerActive = close
  }
  closeAgregarModal(close:boolean){
    this.modalAgregarActive = close
  }
  closeEliminarModal(close:boolean){
    this.modalEliminarActive = close
  }
}


