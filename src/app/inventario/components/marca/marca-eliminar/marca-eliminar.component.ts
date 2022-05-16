import { TmplAstRecursiveVisitor } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Marca } from '../../../interfaces/inventario.interface';
import { MarcaService } from '../../../service/marca.service';

@Component({
  selector: 'app-marca-eliminar',
  templateUrl: './marca-eliminar.component.html',
  styleUrls: ['./marca-eliminar.component.css']
})
export class MarcaEliminarComponent implements OnInit {

  @Output() close = new EventEmitter<boolean>();
  @Input() marca!:Marca;

  @Output() isDelete = new EventEmitter<boolean>();


  constructor(private marcaService: MarcaService) { }

  ngOnInit(): void {
  }

  closeModal(){
   this.close.emit(false)
  }


  deleteMarca(){

    this.marcaService.deleteMarca(this.marca.id).subscribe({
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
