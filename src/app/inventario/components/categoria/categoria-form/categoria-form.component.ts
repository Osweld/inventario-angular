import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria, ErrorResponse } from 'src/app/inventario/interfaces/inventario.interface';
import { CategoriaService } from 'src/app/inventario/service/categoria.service';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.css']
})
export class CategoriaFormComponent implements OnInit {

  @Output() close = new EventEmitter<boolean>();
  @Output() update = new EventEmitter<boolean>();
  @Input() categoria!: Categoria
  @Input() titulo!: String
  isEditing:boolean = false
  isError:boolean = false
  errorResponse!:ErrorResponse
  errorMessage:string = ""



  categoriaForm: FormGroup = this.fb.group({
    nombre: [, [Validators.required, Validators.maxLength(45)]],
    descripcion: [, [Validators.maxLength(1000)]]
  })

  constructor(private fb: FormBuilder, private categoriaService: CategoriaService) { }

  ngOnInit(): void {
  }

  ngDoCheck(): void {

    if(!this.isEditing){
      this.categoriaForm.reset({...this.categoria})
      this.isEditing = true
    }
  }

  //Para validar si es o no valido
  ValidatorsForm(control: string) {
    return this.categoriaForm.get(control)?.errors && this.categoriaForm.get(control)?.touched
  }

  //Texto que tendra el error en el campo nombre
  NombreIsValid() {
    const errors = this.categoriaForm.get("nombre")?.errors

    if (errors?.['required']) {
      return 'El campo no puede quedar vacio'
    } else {
      return 'El nombre debe contener entre 1 y 45 caracteres'
    }
  }

  closeModal() {
    this.categoriaForm.reset({
      nombre: "",
      descripcion: ""
    })
    this.isEditing = false
    this.close.emit(false)
  }

  save() {

    if (this.categoriaForm.invalid) {
      this.categoriaForm.markAllAsTouched()
      return
    }

    this.categoria.nombre = this.categoriaForm.value.nombre
    this.categoria.descripcion = this.categoriaForm.value.descripcion
    if (this.categoria.id > 0) {
      //Actualizar
      this.categoriaService.updateCategoria(this.categoria).subscribe({
        next: () => {
          this.closeModal()
        },
        error: (error) => {
          this.errorResponse = error.error
          if(this.errorResponse.validations.unique !== ""){
            this.errorMessage = this.errorResponse.validations.unique
            this.showError()
          }else{
            this.errorMessage = "Ha ocurrido un problema al agregar la marca"
            this.showError()
          }
        }
      })
    } else {
      //Agregar
      this.categoriaService.saveCategoria(this.categoria).subscribe({
        next: () => {
          this.closeModal()
          this.update.emit(true)
        },
        error: (error) => {
          this.errorResponse = error.error
          if(this.errorResponse.validations.unique !== ""){
            this.errorMessage = this.errorResponse.validations.unique
            this.showError()
          }else{
            this.errorMessage = "Ha ocurrido un problema al agregar la marca"
            this.showError()
          }
        }
      })
    }
  }


  showError(){
    setTimeout(() => {
      this.isError = false
    }, 5000);
    this.isError = true;
  }

}
