import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { Marca } from '../../interfaces/inventario.interface';

@Component({
  selector: 'app-ver-marca',
  templateUrl: './ver-marca.component.html',
  styleUrls: ['./ver-marca.component.css']
})
export class VerMarcaComponent implements OnInit {
  @Output() close= new EventEmitter<boolean>();
  @Input() marca!:Marca;


  constructor() { }

  ngOnInit(): void {
  }

  closeModal(){
    this.close.emit(false)
  }
}
