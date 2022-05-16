import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Articulo } from 'src/app/inventario/interfaces/inventario.interface';
import { ArticuloService } from 'src/app/inventario/service/articulo.service';

@Component({
  selector: 'app-articulo-eliminar',
  templateUrl: './articulo-eliminar.component.html',
  styleUrls: ['./articulo-eliminar.component.css']
})
export class ArticuloEliminarComponent implements OnInit {

  @Output() close = new EventEmitter<boolean>();
  @Input() articulo!:Articulo;

  @Output() isDelete = new EventEmitter<boolean>();


  constructor(private articuloService: ArticuloService) { }

  ngOnInit(): void {
  }

  closeModal(){
   this.close.emit(false)
  }


  deleteMarca(){

    this.articuloService.deleteArticulo(this.articulo.id).subscribe({
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
