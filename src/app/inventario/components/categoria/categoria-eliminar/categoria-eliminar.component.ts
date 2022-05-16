import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Categoria } from 'src/app/inventario/interfaces/inventario.interface';
import { CategoriaService } from 'src/app/inventario/service/categoria.service';

@Component({
  selector: 'app-categoria-eliminar',
  templateUrl: './categoria-eliminar.component.html',
  styleUrls: ['./categoria-eliminar.component.css']
})
export class CategoriaEliminarComponent implements OnInit {

  @Output() close = new EventEmitter<boolean>();
  @Input() categoria!:Categoria;

  @Output() isDelete = new EventEmitter<boolean>();


  constructor(private categoriaService: CategoriaService) { }

  ngOnInit(): void {
  }

  closeModal(){
   this.close.emit(false)
  }


  deleteMarca(){

    this.categoriaService.deleteCategoria(this.categoria.id).subscribe({
      next: () => {
        this.isDelete.emit(true)
        this.closeModal()
      },
      error: (error) => {
        console.error(error)
      }
    })
  }




}
