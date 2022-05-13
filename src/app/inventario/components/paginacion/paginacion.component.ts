import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pagination } from '../../interfaces/inventario.interface';

@Component({
  selector: 'app-paginacion',
  templateUrl: './paginacion.component.html',
  styleUrls: ['./paginacion.component.css']
})
export class PaginacionComponent implements OnInit {

  constructor() { }

  @Input() pagina?:Pagination
  @Output() selectPage = new EventEmitter<number>();

  ngOnInit(): void {
  }

  changePage(page:number){
    this.selectPage.emit(page)
  }

}
