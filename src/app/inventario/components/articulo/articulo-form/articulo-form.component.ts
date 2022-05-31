import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Articulo, Categoria, ErrorResponse, Marca } from "../../../interfaces/inventario.interface";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CategoriaService } from "../../../service/categoria.service";
import { ArticuloService } from 'src/app/inventario/service/articulo.service';
import { MarcaService } from 'src/app/inventario/service/marca.service';

@Component({
  selector: 'app-articulo-form',
  templateUrl: './articulo-form.component.html',
  styleUrls: ['./articulo-form.component.css']
})
export class ArticuloFormComponent implements OnInit {

  @Output() close = new EventEmitter<boolean>();
  @Output() update = new EventEmitter<boolean>();
  @Input() articulo!: Articulo
  @Input() titulo!: String
  errorResponse!:ErrorResponse
  errorMessage:string = ""
  isEditing: boolean = false
  marcas:Marca[] = []
  categorias:Categoria[] = []
  isError:boolean = false


  articuloForm: FormGroup = this.fb.group({
    codigo: ["",[Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
    nombre: ["", [Validators.required, Validators.maxLength(45)]],
    descripcion: ["", [Validators.maxLength(1000)]],
    stock: ["", [Validators.required, Validators.min(0)]],
    precio: ["", [Validators.required, Validators.min(0)]],
    costo: ["", [Validators.required, Validators.min(0)]],
    activo: [true, Validators.required,],
    categoria: ['', [Validators.required, Validators.min(1)]],
    marca: ['', [Validators.required, Validators.min(1)]]
  })

  articulo_validation_messages = {
    'codigo': [
      { type: 'required', message: 'El codigo es requerido' },
      { type: 'minlength', message: 'El codigo tiene que tener 10 caracteres' },
      { type: 'maxlength', message: 'El codigo tiene que tener 10 caracteres' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters' },
    ],
    'nombre': [
      { type: 'required', message: 'El nombre es requerido' },
      { type: 'maxlength', message: 'El nombre tiene que tener menos de 45 caracteres' },
    ],
    'descripcion': [
      { type: 'maxlength', message: 'La descripcion tiene que tener menos de 1000 caracteres' }
    ],
    'stock': [
      { type: 'required', message: 'La cantidad de stock es requerida' },
      { type: 'min', message: 'El stock no puede ser menor a 0 ' },
    ],
    'precio': [
      { type: 'required', message: 'El precio es requerido' },
      { type: 'min', message: 'El precio no puede ser inferior a $0.00' },
    ],
    'costo': [
      { type: 'required', message: 'El costo es requerido' },
      { type: 'min', message: 'El costo no puede ser inferior a $0.00' },
    ],
    'activo': [
      { type: 'required', message: 'Debe seleccionar si el articulo esta activo' }
    ],
    'categoria': [
      { type: 'required', message: 'La categoria es requerida' },
      { type: 'min', message: 'La categoria es requerida' }
    ],
    'marca': [
      { type: 'required', message: 'La marca es requerida' },
      { type: 'min', message: 'La marca es requerida' }
    ],
  }

  constructor(private fb: FormBuilder,
    private articuloService: ArticuloService,
    private marcaService:MarcaService,
    private categoriaService:CategoriaService
    ) { }

  ngOnInit(): void {
    this.categoriaService.getAllCategoriasWithoutPagination().subscribe(categorias => this.categorias = categorias)
    this.marcaService.getAllMarcasWithoutPagination().subscribe(marcas => this.marcas = marcas)
  }

  ngDoCheck(): void {

    if (!this.isEditing) {
      this.articuloForm.reset({
        codigo: this.articulo.codigo,
        nombre: this.articulo.nombre,
        descripcion: this.articulo.descripcion,
        stock: this.articulo.stock,
        precio: this.articulo.precio,
        costo: this.articulo.costo,
        activo: this.articulo.activo,
        categoria: this.articulo.categoria.id,
        marca: this.articulo.marca.id
      })
      this.isEditing = true
    }
  }

  closeModal() {
    this.articuloForm.reset({
      codigo: "",
      nombre: "",
      descripcion: "",
      stock: "",
      precio: "",
      costo: "",
      activo: true,
      categoria:"",
      marca:""
    })
    this.isEditing = false
    this.close.emit(false)
  }

  save() {

    if (this.articuloForm.invalid) {
      this.articuloForm.markAllAsTouched()
      return
    }

    this.articulo.codigo = this.articuloForm.value.codigo
    this.articulo.nombre = this.articuloForm.value.nombre
    this.articulo.descripcion = this.articuloForm.value.descripcion
    this.articulo.stock = this.articuloForm.value.stock
    this.articulo.precio = this.articuloForm.value.precio
    this.articulo.costo = this.articuloForm.value.costo
    this.articulo.activo = this.articuloForm.value.activo
    this.articulo.categoria.id = this.articuloForm.value.categoria
    this.articulo.marca.id = this.articuloForm.value.marca


    if (this.articulo.id > 0) {
      //Actualizar
      this.articuloService.updateArticulo(this.articulo).subscribe({
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
      this.articuloService.saveArticulo(this.articulo).subscribe({
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
