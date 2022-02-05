import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { MedicinaService } from '../../services/medicina.service';

import * as moment from 'moment';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-ficha-certificados',
  templateUrl: './ficha-certificados.component.html',
  styleUrls: ['./ficha-certificados.component.css'],
})
export class FichaCertificadosComponent implements OnInit {
  closeResult = '';
  listaCertificados: any = [];
  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private medicinaService: MedicinaService,
    private usuarioService: UsuarioService
  ) {
    medicinaService
      .obtenerCertificadosPorRut(medicinaService._rutPaciente)
      .subscribe((resp) => {
        console.log(resp);
        this.listaCertificados = resp;
      });
  }

  formularioCertificado: FormGroup = this.fb.group({
    titulo: [, [Validators.required]],
    contenido: [, [Validators.required]],
  });

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  campoEsValido(campo: string) {
    return (
      this.formularioCertificado.controls[campo].errors &&
      this.formularioCertificado.controls[campo].touched
    );
  }

  crearCertificado() {
    const nuevoCertificado = this.formularioCertificado.value;
    nuevoCertificado.id_paciente = this.medicinaService._rutPaciente;
    nuevoCertificado.fecha = moment(new Date())
      .format('YYYY/MM/DD')
      .split('/')
      .join('-');
    nuevoCertificado.id_doctor = this.usuarioService.usuario.rut;

    this.medicinaService
      .crearCertificado(nuevoCertificado)
      .subscribe((valido) => {
        if (valido === true) {
          Swal.fire(
            'Éxito',
            'Signos vitales registrados de forma correcta.',
            'success'
          );
          this.medicinaService
            .obtenerCertificadosPorRut(this.medicinaService._rutPaciente)
            .subscribe((resp) => {
              this.listaCertificados = resp;
            });
          this.modalService.dismissAll();
        } else {
          Swal.fire('Error', valido, 'error');
        }
      });
  }

  ngOnInit(): void {}
}
