import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormularioMedicinaComponent } from 'src/app/components/formulario-medicina/formulario-medicina.component';
import { formAtenValues } from 'src/app/utils/formulario-utils';
import { MedicinaService } from '../../../services/medicina.service';
import { formAntecValues } from '../../../utils/formulario-utils';

import { ActivatedRoute } from '@angular/router';
import { PacienteService } from '../../../services/paciente.service';
import { SignosVitalesService } from '../../../services/signos-vitales.service';
import { Paciente } from 'src/app/interfaces/paciente';
import { SignosVitalesRes } from '../../../interfaces/signos-vitales.interface';
import { calcularEdad } from '../../../utils/calcularEdad';

import { PerfilPacienteComponent } from 'src/app/components/perfil-paciente/perfil-paciente.component';
import { SignosVitalesPacienteComponent } from 'src/app/components/signos-vitales-paciente/signos-vitales-paciente.component';
import { CitasService } from '../../../services/citas.service';

@Component({
  selector: 'app-ficha-paciente',
  templateUrl: './ficha-paciente.component.html',
  styleUrls: ['./ficha-paciente.component.css'],
})
export class FichaPacienteComponent implements OnInit {
  cita!: any;
  rut: any = this.route.snapshot.params['rut'];
  cita_id: any = this.route.snapshot.params['cita'];

  edad_paciente!: any;
  paciente: Paciente = {} as Paciente;
  signosVitales: SignosVitalesRes = {} as SignosVitalesRes;
  constructor(
    private modal: NgbModal,
    private medicinaService: MedicinaService,
    private pacienteService: PacienteService,
    private citasService: CitasService,
    private signosVitalesService: SignosVitalesService,
    private route: ActivatedRoute
  ) {
    this.medicinaService.setFormAten(formAtenValues);
    this.medicinaService.setFormAntec(formAntecValues);
    this.pacienteService
      .obtenerPacientePorRut(this.rut)
      .subscribe((resp: Paciente) => {
        this.paciente = resp;
        this.edad_paciente = calcularEdad(this.paciente.fecha_nacimiento);
      });
    this.signosVitalesService
      .obtenerSignosVistalesPorPaciente(this.rut)
      .subscribe((resp) => {
        this.signosVitales = resp;
      });

    this.medicinaService.setRutPaciente(this.rut);
    this.medicinaService.setCitaPaciente(this.cita_id);
  }

  ngOnInit(): void {
    this.citasService.obtenerCitaPorID(this.cita_id).subscribe((resp) => {
      this.cita = resp;
    });
  }

  abrirFormulario() {
    this.modal.open(FormularioMedicinaComponent, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'xl',
    });
  }

  abrirDatosPaciente() {
    this.modal.open(PerfilPacienteComponent, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'xl',
    });
  }

  abrirSignosVitales() {
    this.modal.open(SignosVitalesPacienteComponent, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
    });
  }
}
