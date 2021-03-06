import { Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { ErrorResponse, Marca } from '../../../interfaces/inventario.interface';
import { MarcaService } from '../../../service/marca.service';

@Component({
  selector: 'app-marca-form',
  templateUrl: './marca-form.component.html',
  styleUrls: ['./marca-form.component.css']
})
export class MarcaFormComponent implements OnInit,DoCheck {

  @Output() close = new EventEmitter<boolean>();
  @Output() refresh = new EventEmitter<boolean>();
  @Input() marca!: Marca
  @Input() titulo!: String
  errorResponse!:ErrorResponse
  errorMessage:string = ""
  isEditing:boolean = false
  isLoading:boolean = false
  isError:boolean = false



  marcaForm: FormGroup = this.fb.group({
    nombre: [, [Validators.required, Validators.maxLength(45)]],
    descripcion: [, [Validators.maxLength(1000)]]
  })

  constructor(private fb: FormBuilder, private marcaService: MarcaService) { }

  ngOnInit(): void {
  }

  ngDoCheck(): void {

    if(!this.isEditing){
      this.marcaForm.reset({...this.marca})
      this.isEditing = true
    }
  }

  //Para validar si es o no valido
  ValidatorsForm(control: string) {
    return this.marcaForm.get(control)?.errors && this.marcaForm.get(control)?.touched
  }

  //Texto que tendra el error en el campo nombre
  NombreIsValid() {
    const errors = this.marcaForm.get("nombre")?.errors

    if (errors?.['required']) {
      return 'El campo no puede quedar vacio'
    } else {
      return 'El nombre debe contener entre 1 y 45 caracteres'
    }
  }

  closeModal() {
    this.marcaForm.reset({
      nombre: "",
      descripcion: ""
    })
    this.isEditing = false
    this.close.emit(false)
  }

  showError(){
    setTimeout(() => {
      this.isError = false
    }, 5000);
    this.isError = true;
  }

  save() {

    if (this.marcaForm.invalid) {
      this.marcaForm.markAllAsTouched()
      return
    }
    this.isLoading  = true
    this.marca.nombre = this.marcaForm.value.nombre
    this.marca.descripcion = this.marcaForm.value.descripcion
    if (this.marca.id > 0) {
      //Actualizar
      this.marcaService.updateMarca(this.marca).subscribe({
        next: () => {
          this.closeModal()
          this.isLoading  = false
        },
        error: (error) => {
          this.errorResponse = error.error
          if(this.errorResponse.validations.unique !== ""){
            this.errorMessage = this.errorResponse.validations.unique
            this.showError()
          }else{
            this.errorMessage = "Ha ocurrido un problema al agregar el articulo"
            this.showError()
          }
          this.isLoading  = false
        }
      })
    } else {
      //Agregar
      this.marcaService.saveMarca(this.marca).subscribe({
        next: () => {
          this.closeModal()
          this.refresh.emit(true)
          this.isLoading  = false
        },
        error: (error) => {
          this.errorResponse = error.error
          if(this.errorResponse.validations.unique !== ""){
            this.errorMessage = this.errorResponse.validations.unique
            this.showError()
          }else{
            this.errorMessage = "Ha ocurrido un problema al agregar el articulo"
            this.showError()
          }
          this.isLoading  = false
        }
      })
    }


  }
}
