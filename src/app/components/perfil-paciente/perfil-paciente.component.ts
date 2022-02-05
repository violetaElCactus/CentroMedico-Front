import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Paciente } from 'src/app/interfaces/paciente';
import { PacienteService } from 'src/app/services/paciente.service';
import Swal from 'sweetalert2';
import { MedicinaService } from '../../services/medicina.service';
import { TerritorioService } from '../../services/territorio.service';

const PACIENTE: Paciente = {
  rut: '',
  nombre: '',
  apellido: '',
};

@Component({
  selector: 'app-perfil-paciente',
  templateUrl: './perfil-paciente.component.html',
  styleUrls: ['./perfil-paciente.component.css'],
})
export class PerfilPacienteComponent implements OnInit {
  paciente: Paciente = PACIENTE;
  rutPaciente: string;
  checkBoxes: any = {
    checkNombreSocial: false,
    checkNacionalidad: false,
    checkPuebloOrigin: false,
  };
  listaRegiones: any[] = [];
  listaComunas: any[] = [];

  formularioPaciente: FormGroup = this.fb.group({
    nombre: [, [Validators.required]],
    apellido: [, [Validators.required]],
    nombre_social: ['', [Validators.required]],
    rut: [{ value: '', disabled: true }, [Validators.required]],
    fecha_nacimiento: [, [Validators.required]],
    telefono: ['+569', []],
    correo_electronico: ['', [Validators.email]],
    sexo: ['', [Validators.required]],
    genero: ['', [Validators.required]],
    nacionalidad: ['chilena', [Validators.required]],
    region: [''],
    comuna: [''],
    pueblo_originario: [''],
    direccion: [, [Validators.required]],
    prevision: [],
    cesfam: ['No aplica'],
  });

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private pacienteService: PacienteService,
    private medicinaService: MedicinaService,
    private territorioService: TerritorioService
  ) {
    this.rutPaciente = medicinaService._rutPaciente;
    pacienteService
      .obtenerPacientePorRut(this.rutPaciente)
      .subscribe((resp) => {
        const { id_paciente, ...pacienteTemp } = resp;
        console.log(resp);

        this.paciente = pacienteTemp;
        const nacimiento = {
          year: parseInt(resp.fecha_nacimiento.slice(0, 4)),
          month: parseInt(resp.fecha_nacimiento.slice(5, 7)),
          day: parseInt(resp.fecha_nacimiento.slice(8, 10)),
        };
        pacienteTemp.fecha_nacimiento = nacimiento;
        this.formularioPaciente.setValue(pacienteTemp);

        territorioService
          .obtenerComunasDeRegion(resp.region)
          .subscribe((resp) => {
            this.listaComunas = resp;
            console.log(resp);
          });
      });

    territorioService.obtenerRegiones().subscribe((resp) => {
      this.listaRegiones = resp;
    });
  }

  toggleShow(box: string) {
    this.checkBoxes[box] = !this.checkBoxes[box];
  }

  obtenerComunas(region: any) {
    this.territorioService.obtenerComunasDeRegion(region).subscribe((resp) => {
      this.listaComunas = resp;
    });
  }

  actualizarPaciente() {
    const pacienteActualizado = this.formularioPaciente.value;
    this.pacienteService
      .actualizarPacientePorRut(pacienteActualizado, this.rutPaciente)
      .subscribe((valido) => {
        if (valido === true) {
          Swal.fire('Éxito', '¡Información actualizada con éxito!', 'success');
        } else {
          Swal.fire('Error', valido, 'error');
        }
      });
  }

  ngOnInit(): void {}
}
