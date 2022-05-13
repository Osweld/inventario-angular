import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticuloComponent } from './pages/articulo/articulo.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { MarcaComponent } from './pages/marca/marca.component';
import { MetricasComponent } from './pages/metricas/metricas.component';

const routes: Routes = [
  {path:'',component:InicioComponent,children:[
    {path:"",component:MetricasComponent},
    {path:"articulos",component:ArticuloComponent},
    {path:"marcas",component:MarcaComponent},
    {path:"categorias",component:CategoriaComponent}
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventarioRoutingModule { }
