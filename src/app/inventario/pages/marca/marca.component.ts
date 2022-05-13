import { Component, DoCheck, OnInit } from '@angular/core';
import { Marca, Pagination } from '../../interfaces/inventario.interface';
import { MarcaService } from '../../service/marca.service';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css']
})
export class MarcaComponent implements OnInit{

  marcas!: Marca[];
  marcasBuscador!: Marca[];
  pagina!: Pagination;
  modalVerActive: boolean = false;
  modalAgregarActive:boolean = false;
  modalEliminarMarca:boolean = false;
  mostrarSugerencias:boolean = false;
  titulo: string = "";

  marca: Marca = {
    id: 0,
    nombre: "",
    descripcion: ""
  }
  constructor(private marcaService: MarcaService) { }



  ngOnInit(): void {
    this.marcaService.getAllMarcas(0).subscribe(pagina => {
      this.marcas = pagina.data
      this.pagina = pagina
    })
  }

  //Pagination

  nextPage(page: Number) {
    this.marcaService.getAllMarcas(page).subscribe(pagina => {
      this.marcas = pagina.data
      this.pagina = pagina
    })
  }


  // Operaciones CRUD
  verMarca(marca: Marca) {
    this.modalVerActive = true;
    this.mostrarSugerencias=false
    this.marca = marca;
  }

  agregarMarca() {
    this.marca = {
      id: 0,
      nombre: "",
      descripcion: ""
    }
    this.titulo = "Agregar Marca"
    this.modalAgregarActive = true
  }

  editarMarca(marca: Marca) {
    this.marca = marca
    this.titulo = "Editar Marca"
    this.modalAgregarActive = true
  }

  eliminarMarca(marca: Marca) {
    this.modalEliminarMarca = true;
    this.marca = marca;
  }

  updatePage(isUpdate:boolean){
    if(isUpdate){
      this.marcaService.getAllMarcas(this.pagina.page).subscribe(pagina => {
        this.marcas = pagina.data
        this.pagina = pagina
      })
    }

  }

  //Buscador
  getMarcasByTermino(termino:string){
    if(termino !== ""){
      this.marcaService.searchMarcas(termino).subscribe(
        marcas =>{
            this.marcasBuscador = marcas;
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
    this.modalEliminarMarca = close
  }
}
