import { Component, OnDestroy, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import * as moment from 'moment';

import { SignosVitalesService } from '../../services/signos-vitales.service';

@Component({
  selector: 'app-enfermeria',
  templateUrl: './enfermeria.component.html',
  styleUrls: ['./enfermeria.component.css'],
})
export class EnfermeriaComponent implements OnInit, OnDestroy {
  fecha!: any;
  listaCitas: any = [];
  zonaSeleccionada: any = '';
  intervalo!: any;
  constructor(
    private signosVitalesService: SignosVitalesService,
    private router: Router
  ) {
    this.fecha = moment(new Date()).format('YYYY/MM/DD').split('/').join('-');
  }

  seleccionarZona() {
    this.signosVitalesService
      .obtenerCitasPorFechaZona(this.fecha, this.zonaSeleccionada)
      .subscribe((resp) => {
        this.listaCitas = resp;
        this.signosVitalesService.setListaCitas(resp);
      });
    this.signosVitalesService.setZona(this.zonaSeleccionada);
    if (this.intervalo) {
      clearInterval(this.intervalo);
    }
    this.intervalo = setInterval(() => {
      this.getNuevasCitas();
    }, 90000);
  }

  atenderPaciente(cita: any) {
    this.signosVitalesService.setCita(cita);
    this.router.navigateByUrl(
      `/dashboard/tens/signos-vitales/${cita.id_consulta}`
    );
  }
  ngOnInit(): void {
    this.zonaSeleccionada = this.signosVitalesService.getZona();
    if (this.zonaSeleccionada !== '') {
      this.signosVitalesService
        .obtenerCitasPorFechaZona(this.fecha, this.zonaSeleccionada)
        .subscribe((resp) => {
          this.listaCitas = resp;
          this.signosVitalesService.setListaCitas(resp);
        });
    }
  }

  getNuevasCitas() {
    console.log('Refrescando signos vitales');
    this.signosVitalesService
      .obtenerCitasPorFechaZona(this.fecha, this.zonaSeleccionada)
      .subscribe((resp) => {
        this.listaCitas = resp;
        this.signosVitalesService.setListaCitas(resp);
      });
  }

  ngOnDestroy(): void {
    if (this.intervalo) {
      clearInterval(this.intervalo);
    }
  }
}
