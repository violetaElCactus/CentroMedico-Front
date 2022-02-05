import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BoxService } from '../../../../services/box.service';

import { Box } from '../../../../interfaces/box.interface';

@Component({
  selector: 'app-agregar-box',
  templateUrl: './agregar-box.component.html',
  styleUrls: ['./agregar-box.component.css'],
})
export class AgregarBoxComponent implements OnInit {
  formularioBox: FormGroup = this.fb.group({
    nombre: [, [Validators.required]],
    zona: [, [Validators.required]],
    etiquetasUso: [],
    habilitado: [, [Validators.required]],
  });

  /**Permite inicializar los valores del box  */

  constructor(
    private fb: FormBuilder,
    private boxService: BoxService,
    private router: Router
  ) {}

  box = {
    nombre: '',
    zona: '',
    etiquetasUso: '',
    habilitado: '',
  };

  ngOnInit(): void {
    this.formularioBox.reset({
      ...this.box,
    });
  }

  campoEsValido(campo: string) {
    return (
      this.formularioBox.controls[campo].errors &&
      this.formularioBox.controls[campo].touched
    );
  }

  crearBox() {
    const nuevoBox: Box = this.formularioBox.value;
    if (nuevoBox.zona !== 'procedimiento') {
      nuevoBox.nombre = `Box #${nuevoBox.nombre}`;
    }
    console.log(nuevoBox);
    this.boxService.crearBox(nuevoBox).subscribe((valido) => {
      if (valido === true) {
        this.router.navigateByUrl('/dashboard/administrador/box/gestionar-box');
      } else {
        console.log('Error');
      }
    });
  }
}
