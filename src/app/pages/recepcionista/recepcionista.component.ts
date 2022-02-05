import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as moment from 'moment';
import Swal from 'sweetalert2';
import { format, validate } from 'rut.js';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Card } from 'src/app/interfaces/card.interface';
import { UsuarioService } from '../../services/usuario.service';
import { PacienteService } from '../../services/paciente.service';
import { CitasService } from '../../services/citas.service';
import { formatearRut } from '../../utils/formatearRut';
import { TerritorioService } from '../../services/territorio.service';

@Component({
  selector: 'app-recepcionista',
  templateUrl: './recepcionista.component.html',
  styleUrls: ['./recepcionista.component.css'],
})
export class RecepcionistaComponent implements OnInit {
  fecha!: any;
  closeResult = '';
  checkBoxes: any = {
    checkNombreSocial: false,
    checkNacionalidad: false,
    checkPuebloOrigin: false,
  };
  listaCitas: any[] = [];
  listaRegiones: any[] = [];
  listaComunas: any[] = [];

  formularioPaciente: FormGroup = this.fb.group({
    nombre: [, [Validators.required]],
    apellido: [, [Validators.required]],
    nombre_social: ['', [Validators.required]],
    rut: [, [Validators.required]],
    fecha_nacimiento: [, [Validators.required]],
    telefono: ['+569'],
    correo_electronico: ['No especifica'],
    sexo: ['', [Validators.required]],
    genero: ['', [Validators.required]],
    nacionalidad: ['chilena', [Validators.required]],
    region: [0],
    comuna: ['0'],
    pueblo_originario: ['No especifica'],
    direccion: [, [Validators.required]],
    prevision: ['No especifica'],
    cesfam: ['No especifica'],
  });

  toggleShow(box: string) {
    this.checkBoxes[box] = !this.checkBoxes[box];
  }

  get usuario() {
    return this.usuarioService.usuario;
  }

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private usuarioService: UsuarioService,
    private pacienteService: PacienteService,
    private citasService: CitasService,
    private territorioService: TerritorioService
  ) {
    this.fecha = moment(new Date()).format('YYYY/MM/DD').split('/').join('-');

    citasService.obtenerCitasConEstado(this.fecha).subscribe((resp) => {
      this.listaCitas = resp;
      this.tarjetas[0].cantidad = this.listaCitas.length;
    });

    citasService.obtenerEstadisticas().subscribe((resp) => {
      this.tarjetas[1].cantidad = resp.cantidad_citas;
      this.tarjetas[2].cantidad = resp.cantidad_pacientes;
      console.log(resp);
    });

    territorioService.obtenerRegiones().subscribe((resp) => {
      this.listaRegiones = resp;
    });
  }

  tarjetas: Card[] = [
    {
      titulo: 'Consultas hoy',
      cantidad: 0,
      icono: 'fas fa-calendar',
    },
    {
      titulo: 'Total de consultas',
      cantidad: 0,
      icono: 'fas fa-chart-bar',
    },
    {
      titulo: 'Pacientes registrados',
      cantidad: 0,
      icono: 'fas fa-user-injured',
    },
    {
      titulo: 'Total de citas sin asistencia',
      cantidad: 0,
      icono: 'fas fa-user-times',
    },
  ];

  //prettier-ignore
  open(content: any) {
    this.listaComunas = [];
    this.formularioPaciente.reset();
    this.formularioPaciente.controls['rut'].setValue('');
    this.formularioPaciente.controls['region'].setValue(0);
    this.formularioPaciente.controls['comuna'].setValue('0');
    this.formularioPaciente.controls['sexo'].setValue('');
    this.formularioPaciente.controls['genero'].setValue('');
    this.formularioPaciente.controls['nombre_social'].setValue('No especifica');
    this.formularioPaciente.controls['nacionalidad'].setValue('chilena');
    this.formularioPaciente.controls['pueblo_originario'].setValue('No especifica');
    this.formularioPaciente.controls['prevision'].setValue('No especifica');
    this.formularioPaciente.controls['cesfam'].setValue('No especifica');
    this.checkBoxes.checkNombreSocial = false;
    this.checkBoxes.checkNacionalidad = false;
    this.checkBoxes.checkPuebloOrigin = false;
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
  }

  registrarPaciente() {
    const nuevoPaciente = this.formularioPaciente.value;
    nuevoPaciente.rut = format(nuevoPaciente.rut, { dots: false });
    const flag: boolean =
      this.checkBoxes.checkNacionalidad || validate(nuevoPaciente.rut);
    console.log(nuevoPaciente);
    if (!flag) {
      Swal.fire('Error', `Rut inválido ${nuevoPaciente.rut}`, 'error');
    } else {
      this.pacienteService
        .registrarPaciente(nuevoPaciente)
        .subscribe((valido) => {
          if (valido === true) {
            Swal.fire(
              'Éxito',
              'Paciente fue registrado de forma correcta.',
              'success'
            );
            this.modalService.dismissAll();
          } else {
            Swal.fire('Error', valido, 'error');
          }
        });
    }
  }

  ngOnInit(): void {}

  obtenerComunas(region: any) {
    this.territorioService.obtenerComunasDeRegion(region).subscribe((resp) => {
      this.listaComunas = resp;
    });
  }

  campoEsValido(campo: string) {
    return (
      this.formularioPaciente.controls[campo].errors &&
      this.formularioPaciente.controls[campo].touched
    );
  }
}
