import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Card } from 'src/app/interfaces/card.interface';
import { UsuarioTabla } from '../../../interfaces/usuario.interface';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  tarjetas: Card[] = [
    {
      titulo: 'Profesional',
      cantidad: 18,
      icono: 'fas fa-user-md',
    },
    {
      titulo: 'Administrativo',
      cantidad: 2,
      icono: 'fas fa-user-nurse',
    },
    {
      titulo: 'Coordinación',
      cantidad: 2,
      icono: 'fas fa-notes-medical',
    },
    {
      titulo: 'Dirección',
      cantidad: 1,
      icono: 'fas fa-hospital-user',
    },
  ];

  usuariosTabla: any[] = [];
  constructor(private usuarioService: UsuarioService, private router: Router) {
    this.usuarioService.obtenerUsuarios().subscribe((resp) => {
      this.usuariosTabla = resp;
    });
  }

  ngOnInit(): void {}
}
