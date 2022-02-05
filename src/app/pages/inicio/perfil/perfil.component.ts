import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { format } from 'rut.js';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  perfilUsuario: any = {
    rut: '',
    nombre: '',
    apellido: '',
    nacimiento: {},
    telefono: '',
    correo_electronico: '',
  };

  formularioPassword: FormGroup = this.fb.group({
    passwordVieja: [, [Validators.required, Validators.minLength(6)]],
    passwordNueva: [, [Validators.required, Validators.minLength(6)]],
  });

  constructor(private usuarioService: UsuarioService, private fb: FormBuilder) {
    usuarioService.obtenerUsuarioPorRut(this.usuario.rut).subscribe((resp) => {
      const fecha_nacimiento = `${resp.nacimiento.day}-${resp.nacimiento.month}-${resp.nacimiento.year}`;
      this.perfilUsuario = { ...resp };
      this.perfilUsuario.nacimiento = fecha_nacimiento;
      this.perfilUsuario.rut = format(this.perfilUsuario.rut);
    });
  }

  get usuario() {
    return this.usuarioService.usuario;
  }

  cambiarPassword() {
    const credencialesUsuario = this.formularioPassword.value;
    const rutUsuario = format(this.perfilUsuario.rut, { dots: false });
    this.usuarioService
      .cambiarPassword(rutUsuario, credencialesUsuario)
      .subscribe((valido) => {
        if (valido === true) {
          Swal.fire('Éxito', 'Cambio de contraseña exitoso', 'success');
        } else {
          Swal.fire('Error', valido, 'error');
        }
      });
  }

  ngOnInit(): void {}
}
