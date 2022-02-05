import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  mostrar: boolean = false;
  get usuario() {
    return this.usuarioService.usuario;
  }
  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {}

  mostrarSidebar() {
    console.log('mostrar');

    const sidebar = document.getElementById('sidebar-container');
    sidebar.classList.toggle('mostrar-sidebar');
  }
}
