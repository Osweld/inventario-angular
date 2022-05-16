import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Articulo } from 'src/app/inventario/interfaces/inventario.interface';

@Component({
  selector: 'app-articulo-ver',
  templateUrl: './articulo-ver.component.html',
  styleUrls: ['./articulo-ver.component.css']
})
export class ArticuloVerComponent implements OnInit {

  @Output() close= new EventEmitter<boolean>();
  @Input() articulo!:Articulo;


  constructor() { }

  ngOnInit(): void {
  }

  closeModal(){
    this.close.emit(false)
  }
}
