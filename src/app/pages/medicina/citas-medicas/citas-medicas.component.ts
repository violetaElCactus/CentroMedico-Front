import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MedicinaService } from '../../../services/medicina.service';
import { UsuarioService } from '../../../services/usuario.service';

import * as moment from 'moment';

@Component({
  selector: 'app-citas-medicas',
  templateUrl: './citas-medicas.component.html',
  styleUrls: ['./citas-medicas.component.css'],
})
export class CitasMedicasComponent implements OnInit, OnDestroy {
  fecha!: any;
  listaCitas: any = [];
  intervalo!: any;

  constructor(
    private medicinaService: MedicinaService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.fecha = moment(new Date()).format('YYYY/MM/DD').split('/').join('-');
    this.medicinaService
      .obtenerCitasMedicaPorRutFecha(this.usuario.rut, this.fecha)
      .subscribe((resp) => {
        this.listaCitas = resp;
        console.log(resp);
      });

    if (this.intervalo) {
      clearInterval(this.intervalo);
    }
    this.intervalo = setInterval(() => {
      this.obtenerNuevasCitas();
    }, 90000);
  }

  get usuario() {
    return this.usuarioService.usuario;
  }

  atenderCita(cita: any) {
    console.log(cita);
    this.router.navigateByUrl(
      `dashboard/medicina/citas-medicas/${cita.id_consulta}/${cita.rut}`
    );
  }

  obtenerNuevasCitas() {
    console.log('Refrescando citas');
    this.medicinaService
      .obtenerCitasMedicaPorRutFecha(this.usuario.rut, this.fecha)
      .subscribe((resp) => {
        this.listaCitas = resp;
        console.log(this.listaCitas);
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.intervalo) {
      clearInterval(this.intervalo);
    }
  }
}
