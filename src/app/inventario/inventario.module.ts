import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventarioRoutingModule } from './inventario-routing.module';
import { InicioComponent } from './pages/inicio/inicio.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ArticuloComponent } from './pages/articulo/articulo.component';
import { MarcaComponent } from './pages/marca/marca.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { PaginacionComponent } from './components/paginacion/paginacion.component';
import { VerMarcaComponent } from './components/ver-marca/ver-marca.component';
import { MarcaFormComponent } from './components/marca-form/marca-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarcaEliminarComponent } from './components/marca-eliminar/marca-eliminar.component';


@NgModule({
  declarations: [
    InicioComponent,
    SidebarComponent,
    ArticuloComponent,
    MarcaComponent,
    CategoriaComponent,
    BuscadorComponent,
    PaginacionComponent,
    VerMarcaComponent,
    MarcaFormComponent,
    MarcaEliminarComponent,
  ],
  imports: [
    CommonModule,
    InventarioRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class InventarioModule { }
