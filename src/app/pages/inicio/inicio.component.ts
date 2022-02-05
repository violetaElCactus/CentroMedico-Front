import { Component, OnInit } from '@angular/core';

import { UsuarioService } from '../../services/usuario.service';

import { Card } from 'src/app/interfaces/card.interface';
import { EtiquetaCita } from 'src/app/interfaces/etiqueta-cita.interface';
import { EstadisticaService } from '../../services/estadistica.service';

import { imprimrCreditos } from '../../utils/creditos';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  constructor(
    private usuarioService: UsuarioService,
    private estadisticaService: EstadisticaService
  ) {
    estadisticaService.obtenerPacientes().subscribe((resp) => {
      this.tarjetas[0].cantidad = resp.cantidad_profesionales;
      this.tarjetas[1].cantidad = resp.cantidad_box;
      this.tarjetas[2].cantidad = resp.cantidad_citas;
    });
  }

  get usuario() {
    return this.usuarioService.usuario;
  }

  tarjetas: Card[] = [
    {
      titulo: 'Profesionales activos',
      cantidad: 0,
      icono: 'fas fa-user-md',
    },
    {
      titulo: 'Boxes registrados',
      cantidad: 0,
      icono: 'fas fa-first-aid',
    },
    {
      titulo: 'Citas ingresadas',
      cantidad: 0,
      icono: 'fas fa-notes-medical',
    },
    {
      titulo: 'Problemas denunciados',
      cantidad: 0,
      icono: 'fas fa-bomb',
    },
  ];

  movimientos: EtiquetaCita[] = [
    {
      box: '1',
      zona: 'A',
      hora: '09:00',
      estado: true,
      profesional: 'Nombre Apellido',
    },
    {
      box: '2',
      zona: 'A',
      hora: '09:00',
      estado: false,
      profesional: 'Nombre Apellido',
    },
    {
      box: '3',
      zona: 'B',
      hora: '10:00',
      estado: true,
      profesional: 'Nombre Apellido',
    },
    {
      box: '1',
      zona: 'A',
      hora: '10:45',
      estado: true,
      profesional: 'Nombre Apellido',
    },
  ];

  ngOnInit(): void {
    /**Comentarla en desarrollo si molesta, pero en producción que se vean los créditos ¬¬ */
    imprimrCreditos();
  }
}
