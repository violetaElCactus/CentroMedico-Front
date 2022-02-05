import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PacienteService } from '../../../services/paciente.service';

import { Paciente } from 'src/app/interfaces/paciente';
import Swal from 'sweetalert2';

const PACIENTE: Paciente = {
  rut: '',
  nombre: '',
  apellido: '',
};

@Component({
  selector: 'app-modificar-paciente',
  templateUrl: './modificar-paciente.component.html',
  styleUrls: ['./modificar-paciente.component.css'],
})
export class ModificarPacienteComponent implements OnInit {
  rutPaciente: any = this.route.snapshot.params['rut'];
  paciente: Paciente = PACIENTE;
  checkBoxes: any = {
    checkNombreSocial: false,
    checkNacionalidad: false,
    checkPuebloOrigin: false,
  };

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
    private fb: FormBuilder,
    private pacienteService: PacienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    pacienteService
      .obtenerPacientePorRut(this.rutPaciente)
      .subscribe((resp) => {
        const { id_paciente, ...pacienteTemp } = resp;
        this.paciente = pacienteTemp;
        const nacimiento = {
          year: parseInt(resp.fecha_nacimiento.slice(0, 4)),
          month: parseInt(resp.fecha_nacimiento.slice(5, 7)),
          day: parseInt(resp.fecha_nacimiento.slice(8, 10)),
        };
        pacienteTemp.fecha_nacimiento = nacimiento;
        this.formularioPaciente.setValue(pacienteTemp);
      });
  }

  toggleShow(box: string) {
    this.checkBoxes[box] = !this.checkBoxes[box];
  }

  actualizarPaciente() {
    const pacienteActualizado = this.formularioPaciente.value;
    this.pacienteService
      .actualizarPacientePorRut(pacienteActualizado, this.rutPaciente)
      .subscribe((valido) => {
        if (valido === true) {
          this.router.navigateByUrl('/dashboard/recepcionista/lista-pacientes');
        } else {
          Swal.fire('Error', valido, 'error');
        }
      });
  }

  ngOnInit(): void {}
}
