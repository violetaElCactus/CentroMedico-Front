import { Component, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import Swal from 'sweetalert2';

import { MedicinaService } from '../../services/medicina.service';
import { UsuarioService } from '../../services/usuario.service';
import { PacienteService } from '../../services/paciente.service';

import { Antecedentes } from '../../interfaces/antecedentes';

import {
  drogasIlegales,
  morbilidades,
  viaAdministacion,
} from 'src/app/utils/formulario-utils';

@Component({
  selector: 'app-formulario-medicina',
  templateUrl: './formulario-medicina.component.html',
  styleUrls: ['./formulario-medicina.component.css'],
})
export class FormularioMedicinaComponent implements OnInit {
  rut: string = '';
  sexo: string = '';
  cita: any = '';

  morbidos!: string[];
  drogasIlegales!: string[];
  viaAdministacion!: string[];
  buscarDiagnostico!: string;
  buscarDiagnosticoDebounce = new Subject<string>();
  listaDiagnostico: any[] = [];
  mensajeBusquedaDiagnostico: string = '';
  formAten: any;
  formAntec: { [index: string]: any } = {} as Antecedentes;

  constructor(
    public activeModal: NgbActiveModal,
    private medicinaService: MedicinaService,
    private usuarioService: UsuarioService,
    private pacienteService: PacienteService
  ) {
    this.morbidos = morbilidades;
    this.drogasIlegales = drogasIlegales;
    this.viaAdministacion = viaAdministacion;

    this.formAten = medicinaService._formAten;
    this.formAntec = medicinaService._formAntec;

    this.rut = medicinaService._rutPaciente;
    this.cita = medicinaService._citaPaciente;
    this.pacienteService.obtenerPacientePorRut(this.rut).subscribe((resp) => {
      this.sexo = resp.sexo;
    });

    console.log(this.formAntec);

    this.medicinaService
      .obtenerAntecedentesPorRut(this.rut)
      .subscribe((resp) => {
        if (resp !== null) {
          this.formAntec = resp;
          delete this.formAntec['id_antadultos'];
          this.formAntec.morb_ = resp.morb.split(',');
          this.formAntec.drogas = resp.drogas.split(',');
          console.log(this.formAntec);
        }
      });
  }

  ngOnInit(): void {
    this.buscarDiagnosticoDebounce
      .pipe(debounceTime(700), distinctUntilChanged())
      .subscribe((value) => {
        this.medicinaService.sugerirDiagnostico(value).subscribe((resp) => {
          const cantResultados = resp.length;
          this.mensajeBusquedaDiagnostico = `¡Se encontrarón ${cantResultados} resultados!`;
          this.listaDiagnostico = resp;
        });
      });
  }

  onCheckHandle(e: any, key: string) {
    if (e.target.checked) {
      this.formAntec[key].push(e.target.value);
    } else {
      let i: number = 0;
      this.formAntec[key].forEach((item: any) => {
        if (item === e.target.value) {
          this.formAntec[key].splice(i, 1);
          return;
        }
        i++;
      });
    }
  }

  addExamen() {
    this.formAten.planest_ad.push({ value: '' });
  }

  removeExamen(i: number) {
    this.formAten.planest_ad.splice(i, 1);
  }

  //med_ad: [{ medicamento: '', via: '', dosis: '', hrs: null, dias: null }],
  addMedicamento() {
    this.formAten.med_ad.push({
      medicamento: '',
      via: '',
      dosis: '',
      hrs: null,
      dias: null,
    });
  }

  removeMedicamento(i: number) {
    this.formAten.med_ad.splice(i, 1);
  }

  addInterno() {
    this.formAten.intern.push({
      value: '',
    });
  }

  removeInterno(i: number) {
    this.formAten.intern.splice(i, 1);
  }

  guardarFormulario() {
    const currentDay = moment().format('DD/MM/YYYY');

    /**Guarda los datos de atención */
    this.formAten.id_doctor = this.usuarioService.usuario.rut;
    this.formAten.id_cita = this.cita;
    this.formAten.rut_paciente = this.rut;
    this.formAten.fechacon_ad = currentDay;

    /**Guarda los datos de antecedentes*/
    this.formAntec.rut_paciente = this.rut;

    /**Ver los formularios */
    console.log(this.formAten);
    console.log(this.formAntec);

    Swal.fire({
      title: '¿Desea confirmar el envío?',
      text: '¡Luego de enviados, los datos no se pueden cambiar!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#111b54',
      cancelButtonColor: '#deb01f',
      confirmButtonText: 'Si, enviar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.activeModal.dismiss();
        this.medicinaService
          .crearDiagnostico(this.formAntec, this.formAten)
          .subscribe((valido) => {
            if (valido === true) {
              window.location.reload();
              Swal.fire(
                'Éxito',
                'Consulta registrados de forma correcta.',
                'success'
              );
            } else {
              Swal.fire('Error', valido, 'error');
            }
          });
      }
    });
  }

  estaMarcado(key: string, value: any) {
    return this.formAntec[key].includes(value);
  }
}
