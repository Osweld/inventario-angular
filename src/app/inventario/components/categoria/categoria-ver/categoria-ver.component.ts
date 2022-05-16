import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Categoria } from 'src/app/inventario/interfaces/inventario.interface';

@Component({
  selector: 'app-categoria-ver',
  templateUrl: './categoria-ver.component.html',
  styleUrls: ['./categoria-ver.component.css']
})
export class CategoriaVerComponent implements OnInit {
  @Output() close= new EventEmitter<boolean>();
  @Input() categoria!:Categoria;


  constructor() { }

  ngOnInit(): void {
  }

  closeModal(){
    this.close.emit(false)
  }
}

