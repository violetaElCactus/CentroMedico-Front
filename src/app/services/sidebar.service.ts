import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu: any[] = [
    //Coordinación === Administración; Coordinación !== Dirección
    {
      titulo: 'Administrador',
      icono: 'fas fa-laptop-medical',
      submenu: [
        { titulo: 'Inicio', url: '/' },
        { titulo: 'Usuarios', url: 'administrador/usuarios' },
        { titulo: 'Box de atención', url: 'administrador/box' },
        { titulo: 'Estadísticas', url: 'administrador/estadisticas' },
      ],
      clave: 'coordinacion',
    },
    {
      titulo: 'Recepcionista',
      icono: 'fas fa-hospital-user',
      submenu: [
        { titulo: 'Inicio', url: 'recepcionista/inicio' },
        { titulo: 'Crear citas', url: 'recepcionista/crear-cita' },
        { titulo: 'Agendar citas', url: 'recepcionista/agendar-cita' },
        { titulo: 'Lista pacientes', url: 'recepcionista/lista-pacientes' },
      ],
      clave: 'recepcion',
    },
    {
      titulo: 'Medicina',
      icono: 'fas fa-user-md',
      submenu: [
        { titulo: 'Inicio', url: '/' },
        { titulo: 'Citas', url: 'medicina/citas-medicas' },
        { titulo: 'Pacientes', url: 'medicina/pacientes' },
      ],
      clave: 'medicina',
    },
    {
      titulo: 'Signos vitales',
      icono: 'fas fa-user-nurse',
      submenu: [{ titulo: 'Inicio', url: 'tens/signos-vitales' }],
      clave: 'enfermeria',
    },
  ];

  menuSesion: any = [];
  constructor() {}

  establecerEnlaces() {
    const roles = localStorage.getItem('rol');

    /**Si la persona que ingresa es director del centro médico */
    if (roles?.includes('direccion')) return this.menu;

    /**Otras combinaciones */
    this.menuSesion = [];
    this.menu.map((el) => {
      if (roles?.includes(el.clave)) {
        this.menuSesion.push(el);
      }
    });
    return this.menuSesion;
  }
}
