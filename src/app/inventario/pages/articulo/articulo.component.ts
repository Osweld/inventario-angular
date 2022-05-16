import { Component, OnInit } from '@angular/core';
import { Articulo, Pagination } from '../../interfaces/inventario.interface';
import { ArticuloService } from '../../service/articulo.service';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css']
})
export class ArticuloComponent implements OnInit {

  articulos!: Articulo[];
  articulosBuscador!: Articulo[];
  pagina!: Pagination;
  modalVerActive: boolean = false;
  modalAgregarActive: boolean = false;
  modalEliminarActive: boolean = false;
  mostrarSugerencias: boolean = false;
  titulo: string = "";

  articulo: Articulo = {
    id: 0,
    nombre: "",
    descripcion: "",
    stock: 0,
    codigo: "",
    precio: 0,
    costo: 0,
    activo: false,
    categoria: {
      id: 0,
      nombre: "",
      descripcion: ""
    },
    marca: {
      id: 0,
      nombre: "",
      descripcion: ""
    }
  }
  constructor(private articuloService: ArticuloService) { }



  ngOnInit(): void {
    this.articuloService.getAllArticulos(0).subscribe(pagina => {
      this.articulos = pagina.data
      this.pagina = pagina
      console.log(this.articulos)
    })
  }

  //Pagination

  nextPage(page: Number) {
    this.articuloService.getAllArticulos(page).subscribe(pagina => {
      this.articulos = pagina.data
      this.pagina = pagina
    })
  }


  // Operaciones CRUD
  verArticulo(articulo: Articulo) {
    this.modalVerActive = true;
    this.mostrarSugerencias = false
    this.articulo = articulo;
  }

  agregarArticulo() {
    this.articulo = {
      id: 0,
      nombre: "",
      descripcion: "",
      stock: 0,
      codigo: "",
      precio: 0,
      costo: 0,
      activo: false,
      categoria: {
        id: 0,
        nombre: "",
        descripcion: ""
      },
      marca: {
        id: 0,
        nombre: "",
        descripcion: ""
      }
    }
    this.titulo = "Agregar Articulo"
    this.modalAgregarActive = true
  }

  editarArticulo(articulo: Articulo) {
    this.articulo = articulo
    this.titulo = "Editar Articulo"
    this.modalAgregarActive = true
  }

  eliminarArticulo(articulo: Articulo) {
    this.modalEliminarActive= true;
    this.articulo = articulo;
  }

  updatePage(isUpdate: boolean) {
    if (isUpdate) {
      this.articuloService.getAllArticulos(this.pagina.page).subscribe(pagina => {
        this.articulos = pagina.data
        this.pagina = pagina
      })
    }

  }

  //Buscador
  getArticulosByTermino(termino: string) {
    if (termino !== "") {
      this.articuloService.searchArticulos(termino).subscribe(
        marcas => {
          this.articulosBuscador = marcas;
          this.mostrarSugerencias = true
        }
      )
    } else {
      this.mostrarSugerencias = false
    }

  }



  //Cerrar modales
  closeVerModal(close: boolean) {
    this.modalVerActive = close
  }
  closeAgregarModal(close: boolean) {
    this.modalAgregarActive = close
  }
  closeEliminarModal(close: boolean) {
    this.modalEliminarActive = close
  }
}
