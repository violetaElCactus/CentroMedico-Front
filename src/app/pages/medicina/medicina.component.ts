import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

// import { UsuarioService } from '../../../../services/usuario.service';

// import { UsuarioNuevo } from '../../../../interfaces/usuario.interface';

@Component({
  selector: 'app-medicina',
  templateUrl: './medicina.component.html',
  styleUrls: ['./medicina.component.css'],
})
export class MedicinaComponent implements OnInit {
  constructor(
    private fb: FormBuilder
  ) //  private usuarioService: UsuarioService,
  //  private router: Router
  {}

  formularioExamenFisico: FormGroup = this.fb.group({
    deambulacion: ['no evaluado', [Validators.required]],
    facies: ['no evaluado', [Validators.required]],
    pielYFanereos: ['no evaluado', [Validators.required]],
    estadoMental: ['no evaluado', [Validators.required]],
    adenopatias: ['no evaluado', [Validators.required]],
    cabeza: ['no evaluado', [Validators.required]],
    cuello: ['no evaluado', [Validators.required]],
    torax: ['no evaluado', [Validators.required]],
    mamas: ['no evaluado', [Validators.required]],
    corazon: ['no evaluado', [Validators.required]],
    pulmones: ['no evaluado', [Validators.required]],
    abdomen: ['no evaluado', [Validators.required]],
    columna: ['no evaluado', [Validators.required]],
    extremidades: ['no evaluado', [Validators.required]],
    genitales: ['no evaluado', [Validators.required]],
    exNeurologico: ['no evaluado', [Validators.required]],
    tactoRectal: ['no evaluado', [Validators.required]],
  });

  formularioAnamnesis: FormGroup = this.fb.group({
    motivo: [, [Validators.required]],
    alfabeta: [false],
    nvlEducacion: ['no evaluado', [Validators.required]],
    nutri: ['no evaluado', [Validators.required]],
    estadoCivil: ['no evaluado', [Validators.required, Validators.email]],
    otroEstadoCivil: [,],
    alergia: [false],
    nombreAlergia: [,],
    inmuni: [false],
    nombreInmuni: [,],
    tabaco: [false],
    cantTabaco: [, [Validators.required]],
    alcohol: [false],
    cantAlcohol: [, [Validators.required]],
    cannabis: [false],
    cocaina: [false],
    pastaBase: [false],
    otraDroga: [, [Validators.required]],
    ejercicio: [false],
    horasEjercicio: [, [Validators.required]],
    diasEjercicio: [, [Validators.required]],
    morbido: [false],
    arrayMorbido: this.fb.array([]),
    morbidoFam: [false],
    arrayMorbidoFam: this.fb.array([]),
    quirurgicos: [false],
    arrayQuirurgicos: this.fb.array([]),
    arrayQuirurgicosAnos: this.fb.array([]),
    farmacos: [false],
    arrayFarmacos: this.fb.array([]),
    arrayFarmacosDiag: this.fb.array([]),
  });

  AntecedentesMorbidos: Array<any> = [
    { nombre: 'HTA', valor: 'HTA' },
    { nombre: 'DM', valor: 'DM' },
    { nombre: 'Hipotiroidismo', valor: 'Hipotiroidismo' },
    { nombre: 'Asma', valor: 'Asma' },
    { nombre: 'TBC', valor: 'TBC' },
    { nombre: 'Epilepsia', valor: 'Epilepsia' },
    { nombre: 'Dislipidemia', valor: 'Dislipidemia' },
    { nombre: 'Enf.Digestivas', valor: 'Enf.Digestivas' },
    { nombre: 'Enf.Cardiacas', valor: 'Enf.Cardiacas' },
    { nombre: 'Sist.Endocrino', valor: 'Sist.Endocrino' },
    { nombre: 'Sist.Respiratorio', valor: 'Sist.Respiratorio' },
    { nombre: 'Sist.Urinario', valor: 'Sist.Urinario' },
    { nombre: 'Enf.Neurológicas', valor: 'Enf.Neurologicas' },
    { nombre: 'Antec.Salud Mental', valor: 'Antec.Salud_Mental' },
    { nombre: 'Inmuno', valor: 'Inmuno' },
    { nombre: 'Tiroides', valor: 'Tiroides' },
  ];

  onMorbido(e: any) {
    const arrayMorbido: FormArray = this.formularioAnamnesis.get(
      'arrayMorbido'
    ) as FormArray;
    if (e.target.checked) {
      arrayMorbido.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      arrayMorbido.controls.forEach((item) => {
        if (item.value === e.target.value) {
          arrayMorbido.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  onMorbidoFam(e: any) {
    const arrayMorbidoFam: FormArray = this.formularioAnamnesis.get(
      'arrayMorbidoFam'
    ) as FormArray;
    if (e.target.checked) {
      arrayMorbidoFam.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      arrayMorbidoFam.controls.forEach((item) => {
        if (item.value === e.target.value) {
          arrayMorbidoFam.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  ngOnInit(): void {}
  title = 'appComponent';

  isShowDiv = true;

  toggleDisplayDiv() {
    this.isShowDiv = !this.isShowDiv;
  }
}
