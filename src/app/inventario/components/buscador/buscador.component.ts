import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, take } from 'rxjs';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  @Output() termino = new EventEmitter<string>();


  buscarForm: FormGroup = this.fb.group({
    termino: [,Validators.required]
  })

  ngOnInit(): void {
  }

  getTermino(){
    this.buscarForm.valueChanges.pipe(debounceTime(500),take(1)).subscribe(
      value =>{
        this.termino.emit(value.termino)
      }
    )
  }


  buscar(){

  }

}
