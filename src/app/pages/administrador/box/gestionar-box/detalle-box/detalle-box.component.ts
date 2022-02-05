import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Box } from 'src/app/interfaces/box.interface';

import { BoxService } from '../../../../../services/box.service';
import { BoxResponse } from '../../../../../interfaces/box.interface';

@Component({
  selector: 'app-detalle-box',
  templateUrl: './detalle-box.component.html',
  styleUrls: ['./detalle-box.component.css'],
})
export class DetalleBoxComponent implements OnInit {
  formularioBox: FormGroup = this.fb.group({
    nombre: [, [Validators.required]],
    zona: [, [Validators.required]],
    etiquetasUso: [],
    habilitado: [, [Validators.required]],
  });

  constructor(
    private boxService: BoxService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  box!: BoxResponse;

  ngOnInit(): void {
    const idBox = this.route.snapshot.params['id'];
    this.boxService.obtenerBoxPorId(idBox).subscribe((resp) => {
      console.log(resp);

      const { zona, nro_box, uso, habilitado } = resp;
      this.formularioBox.setValue({
        nombre: nro_box,
        zona,
        etiquetasUso: uso,
        habilitado,
      });
      this.box = resp;
    });
  }

  campoEsValido(campo: string) {
    return (
      this.formularioBox.controls[campo].errors &&
      this.formularioBox.controls[campo].touched
    );
  }

  actualizarBox() {
    const nuevoBox: Box = this.formularioBox.value;
    const idBox = this.route.snapshot.params['id'];
    this.boxService.actualizarBoxPorId(idBox, nuevoBox).subscribe((valido) => {
      console.log(valido);
      if (valido === true) {
        this.router.navigateByUrl('/dashboard/administrador/box/gestionar-box');
      } else {
        console.log('Error');
      }
    });
  }
}
