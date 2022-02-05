import { Component, Input, OnInit } from '@angular/core';
import { UsuarioTabla } from 'src/app/interfaces/usuario.interface';

const USUARIO: UsuarioTabla[] = [
  {
    nombreCompleto: 'Error al cargar usuarios',
    email: 'error@diosmio.cl',
    estado: 'no disponible',
    roles: [{ rol: 'algo salio mal :(' }],
    contacto: 'no hay',
  },
];

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css'],
})
export class TablaComponent implements OnInit {
  @Input() usuarios: any[] = USUARIO;

  buscarProfesional!: string;

  constructor() {}

  ngOnInit(): void {}
}
