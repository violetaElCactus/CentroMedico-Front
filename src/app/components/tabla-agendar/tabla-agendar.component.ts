import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { BoxService } from '../../services/box.service';

import { generarHorarios } from '../../utils/generarHorarios';
import { CitasService } from '../../services/citas.service';

@Component({
  selector: 'app-tabla-agendar',
  templateUrl: './tabla-agendar.component.html',
  styleUrls: ['./tabla-agendar.component.css'],
})
export class TablaAgendarComponent implements OnInit {
  closeResult = '';
  listaBox!: any[];
  listaHorarios!: any[];
  listaSectores!: string[];
  listaCitas: any[] = [];
  fecha: any = this.route.snapshot.params['fecha'];
  boxSeleccionado: any = '';
  horaSeleccionada: any = '';
  puedeModificar: boolean = true;
  cita = {
    edad_paciente: '',
    hora: '',
    id_consulta: '',
    nombre_paciente: '',
    nombre_profesional: '',
    nombre_social: '',
    rut: '',
    telefono: '',
    tipo: '',
    valor: '',
    fecha: '',
    lugar_atencion: '',
  };

  formularioCita: FormGroup = this.fb.group({
    edad_paciente: [{ value: '', disabled: true }],
    hora: [{ value: '', disabled: true }, [Validators.required]],
    id_consulta: [{ value: '', disabled: true }],
    nombre_paciente: [{ value: '', disabled: true }],
    nombre_profesional: [{ value: '', disabled: true }],
    nombre_social: [{ value: '', disabled: true }],
    rut: [{ value: '', disabled: true }],
    telefono: [{ value: '', disabled: true }],
    tipo: [{ value: '', disabled: true }],
    valor: [{ value: '', disabled: true }],
    fecha: [{ value: '', disabled: true }],
    lugar_atencion: [{ value: '', disabled: true }],
  });

  constructor(
    private boxService: BoxService,
    private citasService: CitasService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {
    boxService.obtenerBoxes().subscribe((resp) => {
      this.listaBox = resp;

      this.listaSectores = [...new Set(resp.map((box) => box.zona))];
    });
    citasService.obtenerCitasPorFecha(this.fecha).subscribe((resp) => {
      this.listaCitas = resp;
      console.log(resp);
    });
    this.listaHorarios = generarHorarios(8, 16);
    console.log(this.fecha);
    let fechaTemp = this.fecha.split('-').join('/');
    const hoy = new Date();
    const diaTabla = new Date(fechaTemp);
    diaTabla.setHours(23, 59, 59);
    if (hoy > diaTabla) {
      this.puedeModificar = false;
    } else {
      this.puedeModificar = true;
    }
  }

  ngOnInit(): void {}

  obtenerDia(hora: string, boxId: any, content: any) {
    this.horaSeleccionada = hora;
    this.boxSeleccionado = boxId;
    this.citasService
      .obtenerCitaPorHorario(hora, this.fecha, boxId)
      .subscribe((resp) => {
        if (resp !== null) {
          if (resp.length !== 0) {
            if (resp.nombre_social === '')
              resp.nombre_social = 'Paciente sin nombre social';
            this.formularioCita.setValue(resp);
          } else {
            this.formularioCita.setValue(this.cita);
          }
        } else {
          this.formularioCita.setValue(this.cita);
        }
      });
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
    });
  }

  agendarPaciente(paciente: any) {
    this.formularioCita.reset();
    const { nombre_social, ...pacienteSeleccionado } = paciente;
    pacienteSeleccionado.lugar_atencion = this.boxSeleccionado;
    pacienteSeleccionado.hora = this.horaSeleccionada;
    pacienteSeleccionado.fecha = this.fecha;
    pacienteSeleccionado.nombre_social =
      nombre_social !== '' ? nombre_social : 'Sin nombre social';
    this.formularioCita.setValue(pacienteSeleccionado);
    console.log(this.formularioCita.value);
  }

  actualizar() {
    const citaActualizada = this.formularioCita.value;
    console.log(citaActualizada);

    this.citasService.actualizarCita(citaActualizada).subscribe((valido) => {
      if (valido === true) {
        Swal.fire('Éxito', 'Cita agendada de forma correcta.', 'success');
        this.citasService.obtenerCitasPorFecha(this.fecha).subscribe((resp) => {
          this.listaCitas = resp;
        });
        this.modalService.dismissAll();
      } else {
        Swal.fire('Error', valido, 'error');
      }
    });
  }

  eliminarCita() {
    const citaActualizada = this.formularioCita.value;
    citaActualizada.lugar_atencion = null;
    citaActualizada.hora = '';
    this.citasService.actualizarCita(citaActualizada).subscribe((valido) => {
      if (valido === true) {
        Swal.fire('Éxito', 'Cita removida del horario', 'success');
        this.citasService.obtenerCitasPorFecha(this.fecha).subscribe((resp) => {
          this.listaCitas = resp;
        });
        this.modalService.dismissAll();
      } else {
        Swal.fire('Error', valido, 'error');
      }
    });
  }
}
