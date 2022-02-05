import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { formatearFecha } from 'src/app/utils/formatearFecha';
import { CitasService } from '../../../../services/citas.service';

@Component({
  selector: 'app-citas-agendadas',
  templateUrl: './citas-agendadas.component.html',
  styleUrls: ['./citas-agendadas.component.css'],
})
export class CitasAgendadasComponent implements OnInit {
  mensajeCabecera!: string;
  fecha: any = this.route.snapshot.params['fecha'];
  listaDeCitas: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private citasService: CitasService
  ) {
    this.mensajeCabecera = formatearFecha(this.fecha);
    this.citasService.obtenerCitasPorFecha(this.fecha).subscribe((resp) => {
      this.listaDeCitas = resp;
    });
  }

  ngOnInit(): void {}
}
