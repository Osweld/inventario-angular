import { Component, OnInit } from '@angular/core';


interface MenuItem{
  nombre:string;
  url:string;
  icon:string;

}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menu:MenuItem[] = [
    {
      nombre:"Inicio",
      url:"./",
      icon:"fas fa-camera"
    },
    {
      nombre:"Articulos",
      url:"./articulos",
      icon:"fas fa-camera"
    },
    {
      nombre:"Categorias",
      url:"./categorias",
      icon:"fas fa-camera"
    },
    {
      nombre:"Marcas",
      url:"./marcas",
      icon:"fas fa-camera"
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
