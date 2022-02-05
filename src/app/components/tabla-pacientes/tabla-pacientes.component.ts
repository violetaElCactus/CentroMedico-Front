import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import * as moment from 'moment';
import Swal from 'sweetalert2';

import { CitasService } from '../../services/citas.service';

@Component({
  selector: 'app-tabla-pacientes',
  templateUrl: './tabla-pacientes.component.html',
  styleUrls: ['./tabla-pacientes.component.css'],
})
export class TablaPacientesComponent implements OnInit {
  filter = new FormControl('');
  @Input() listaCitas!: any;
  buscarPaciente!: string;
  fecha!: any;

  constructor(private citasService: CitasService) {}

  ngOnInit(): void {}

  confirmarCita(cita: any) {
    const citaActualizada = { id_consulta: cita.id_consulta, confirmada: 0 };

    if (cita.estado !== 'creada') {
      citaActualizada.confirmada = cita.confirmada === 0 ? 1 : 0;
      console.log(citaActualizada.confirmada);

      this.citasService.confirmarCita(citaActualizada).subscribe((valido) => {
        if (valido === true) {
          this.actualizarTablaCitas();
          Swal.fire(
            'Éxito',
            'Confirmación actualizada de forma satisfactoria.',
            'success'
          );
        } else {
          Swal.fire('Error', valido, 'error');
        }
      });
    } else {
      Swal.fire(
        'Adevertencia',
        'Antes de presionar confirmar, es necesario agendar la cita.',
        'warning'
      );
    }
  }

  asistirCita(cita: any) {
    const citaActualizada = { id_consulta: cita.id_consulta, estado: '' };
    console.log(cita.estado);

    if (cita.estado !== 'creada') {
      citaActualizada.estado =
        cita.estado === 'agendada' ? 'asistida' : 'agendada';
      this.citasService.asistirCita(citaActualizada).subscribe((valido) => {
        if (valido === true) {
          this.actualizarTablaCitas();
          Swal.fire(
            'Éxito',
            'Confirmación actualizada de forma satisfactoria.',
            'success'
          );
        } else {
          Swal.fire('Error', valido, 'error');
        }
      });
    } else {
      Swal.fire(
        'Adevertencia',
        'Antes de presionar asistir, es necesario agendar la cita.',
        'warning'
      );
    }
  }

  actualizarTablaCitas() {
    this.fecha = moment(new Date()).format('YYYY/MM/DD').split('/').join('-');
    this.citasService.obtenerCitasConEstado(this.fecha).subscribe((resp) => {
      this.listaCitas = resp;
    });
  }
}
