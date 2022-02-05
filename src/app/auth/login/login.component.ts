import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { format, validate } from 'rut.js';

import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginFormulario: FormGroup = this.fb.group({
    rut: ['11111111-1', [Validators.required]],
    password: [, [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  campoEsValido(campo: string) {
    return (
      this.loginFormulario.controls[campo].errors &&
      this.loginFormulario.controls[campo].touched
    );
  }

  login() {
    const { rut, password } = this.loginFormulario.value;
    const rutFormateado = format(rut, { dots: false });
    if (!validate(rutFormateado)) {
      Swal.fire('Error', `Rut inválido ${rutFormateado}`, 'error');
    } else {
      this.usuarioService.login(rutFormateado, password).subscribe((valido) => {
        if (valido === true) {
          this.router.navigateByUrl('/dashboard');
        } else {
          Swal.fire('Error', valido, 'error');
        }
      });
    }
  }

  ngOnInit(): void {}
}
