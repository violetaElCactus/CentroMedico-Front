import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  menuItems!: any[];
  menuTemp!: any[];
  constructor(
    private sidebarService: SidebarService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.menuItems = sidebarService.establecerEnlaces();
  }

  cerrarSesion() {
    this.usuarioService.logout();
    this.router.navigateByUrl('/login');
  }

  ngOnInit(): void {
    const sidebar = document.getElementById('sidebar-container');
    sidebar?.classList.add('scroll-menu');
  }
}
