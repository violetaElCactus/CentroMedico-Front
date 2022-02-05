import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { UsuarioService } from '../../../../services/usuario.service';

import { UsuarioNuevo } from '../../../../interfaces/usuario.interface';
import { format, validate } from 'rut.js';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-usuarios',
  templateUrl: './agregar-usuarios.component.html',
  styleUrls: ['./agregar-usuarios.component.css'],
})
export class AgregarUsuariosComponent implements OnInit {
  model!: NgbDateStruct;
  AreaMedica!: Array<any>;
  AreaAdministrativa!: Array<any>;

  formularioRegistro: FormGroup = this.fb.group({
    rut: [, [Validators.required]],
    nombre: [, [Validators.required]],
    apellido: [, [Validators.required]],
    correo_electronico: [, [Validators.required, Validators.email]],
    telefono: [, [Validators.required]],
    nacimiento: [, [Validators.required]],
    sexo: ['', [Validators.required]],
    coordinacion: [false],
    profesional: [false],
    direccion: [false],
    administrativo: [false],
    area_medica: this.fb.array([]),
    area_administrativa: this.fb.array([]),
  });

  /**Permite inicializar la memoria asociada al usuario */
  usuario = {
    rut: '',
    nombre: '',
    apellido: '',
    email: '',
    contacto: '',
    nacimiento: '',
    sexo: '',
  };

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.AreaMedica = this.usuarioService.AreaMedica;
    this.AreaAdministrativa = this.usuarioService.AreaAdministrativa;
  }

  ngOnInit(): void {
    this.formularioRegistro.reset({
      ...this.usuario,
      rol_coordinacion: false,
      rol_profesional: false,
      rol_direccion: false,
      rol_administrativo: false,
      area_medica: [],
      area_administrativa: [],
    });
  }

  onAreaMedica(e: any) {
    const area_medica: FormArray = this.formularioRegistro.get(
      'area_medica'
    ) as FormArray;
    if (e.target.checked) {
      area_medica.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      area_medica.controls.forEach((item) => {
        if (item.value === e.target.value) {
          area_medica.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  onAreaMedicaChange(e: any) {
    if (!this.formularioRegistro.get('rol_profesional')?.value) {
      const area_medica: FormArray = this.formularioRegistro.get(
        'area_medica'
      ) as FormArray;
      area_medica.clear();
    }
  }

  onAreaAdministrativa(e: any) {
    const area_administrativa: FormArray = this.formularioRegistro.get(
      'area_administrativa'
    ) as FormArray;

    if (e.target.checked) {
      area_administrativa.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      area_administrativa.controls.forEach((item) => {
        if (item.value == e.target.value) {
          area_administrativa.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  onAdministrativoChange(e: any) {
    console.log('Entre');
    if (!this.formularioRegistro.get('rol_administrativo')?.value) {
      const area_administrativa: FormArray = this.formularioRegistro.get(
        'area_administrativa'
      ) as FormArray;
      area_administrativa.clear();
    }
  }

  campoEsValido(campo: string) {
    return (
      this.formularioRegistro.controls[campo].errors &&
      this.formularioRegistro.controls[campo].touched
    );
  }

  select(d: any) {
    const date = new Date(d.year, d.month, d.day);
    console.log(date);
  }

  registro() {
    const nuevoUsuario: UsuarioNuevo = this.formularioRegistro.value;
    nuevoUsuario.rut = format(nuevoUsuario.rut, { dots: false });
    console.log(nuevoUsuario);
    if (!validate(nuevoUsuario.rut)) {
      Swal.fire('Error', `Rut inválido ${nuevoUsuario.rut}`, 'error');
    } else {
      this.usuarioService.registro(nuevoUsuario).subscribe((valido) => {
        console.log(valido);
        if (valido === true) {
          this.router.navigateByUrl('/dashboard/administrador/usuarios');
        } else {
          console.log('Error');
        }
      });
    }
  }
}
