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
import { VerMarcaComponent } from './components/marca/ver-marca/ver-marca.component';
import { MarcaFormComponent } from './components/marca/marca-form/marca-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarcaEliminarComponent } from './components/marca/marca-eliminar/marca-eliminar.component';
import { CategoriaEliminarComponent } from './components/categoria/categoria-eliminar/categoria-eliminar.component';
import { CategoriaVerComponent } from './components/categoria/categoria-ver/categoria-ver.component';
import { CategoriaFormComponent } from './components/categoria/categoria-form/categoria-form.component';
import { ArticuloEliminarComponent } from './components/articulo/articulo-eliminar/articulo-eliminar.component';
import { ArticuloVerComponent } from './components/articulo/articulo-ver/articulo-ver.component';
import { ArticuloFormComponent } from './components/articulo/articulo-form/articulo-form.component';


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
    CategoriaEliminarComponent,
    CategoriaVerComponent,
    CategoriaFormComponent,
    ArticuloEliminarComponent,
    ArticuloVerComponent,
    ArticuloFormComponent,
  ],
  imports: [
    CommonModule,
    InventarioRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class InventarioModule { }
