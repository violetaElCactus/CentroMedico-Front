import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as moment from 'moment';
import Swal from 'sweetalert2';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SignosVitalesService } from 'src/app/services/signos-vitales.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MedicinaService } from '../../services/medicina.service';

@Component({
  selector: 'app-signos-vitales-paciente',
  templateUrl: './signos-vitales-paciente.component.html',
  styleUrls: ['./signos-vitales-paciente.component.css'],
})
export class SignosVitalesPacienteComponent implements OnInit {
  cita!: any;
  rut_paciente!: string;
  id_consulta!: string;
  peso!: number;
  talla!: number;
  ccintura!: number;
  pulso!: number;
  sat!: number;
  pam1!: number;
  pam2!: number;
  temp!: number;
  fresp!: number;
  fecha!: any;
  constructor(
    public activeModal: NgbActiveModal,
    private signosVitalesService: SignosVitalesService,
    private medicinaService: MedicinaService,
    private usuarioService: UsuarioService
  ) {
    this.fecha = moment(new Date()).format('YYYY/MM/DD').split('/').join('-');
    this.cita = medicinaService._citaPaciente;
    this.rut_paciente = medicinaService._rutPaciente;
    signosVitalesService
      .obtenerSignosVitalesPorId(this.cita)
      .subscribe((resp) => {
        if (resp.length !== 0) {
          console.log(resp);
          const pam: any = resp.pam.split('/');
          this.peso = resp.peso;
          this.talla = resp.talla;
          this.ccintura = resp.ccintura;
          this.pulso = resp.pulso;
          this.sat = resp.sat;
          this.pam1 = pam[0];
          this.pam2 = pam[1];
          this.temp = resp.temp;
          this.fresp = resp.fresp;
        } else {
          console.log('no hago nada 🦴');
        }
      });
  }

  get imc(): number {
    return this.peso / Math.pow(this.talla, 2);
  }

  get usuario() {
    return this.usuarioService.usuario;
  }

  get estadoNutri(): string {
    const imcTemp = this.imc;
    if (imcTemp < 18.5) return 'Bajo peso';
    if (imcTemp >= 18.5 && imcTemp <= 24.99) return 'Normal';
    if (imcTemp >= 25 && imcTemp < 30) return 'Sobrepeso';
    if (imcTemp >= 30) return 'Obesidad';
    return '';
  }

  guardarSignosVitales() {
    const nuevosSignosVitales = {
      id_consulta: this.cita,
      id_paciente: this.rut_paciente,
      id_usuario_sv: this.usuario.rut,
      fecha: this.fecha,
      peso: this.peso,
      talla: this.talla,
      ccintura: this.ccintura,
      pulso: this.pulso,
      sat: this.sat,
      pam: `${this.pam1}/${this.pam2}`,
      temp: this.temp,
      fresp: this.fresp,
      imc: this.imc,
      estado_nutri: this.estadoNutri,
    };
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
        this.signosVitalesService
          .crarSignosVitales(nuevosSignosVitales)
          .subscribe((valido) => {
            if (valido === true) {
              window.location.reload();
              Swal.fire(
                'Éxito',
                'Signos vitales registrados de forma correcta.',
                'success'
              );
            } else {
              Swal.fire('Error', valido, 'error');
            }
          });
      }
    });
  }

  ngOnInit(): void {}
}
