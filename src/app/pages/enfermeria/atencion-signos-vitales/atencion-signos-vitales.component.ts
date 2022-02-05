import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UsuarioService } from '../../../services/usuario.service';
import { SignosVitalesService } from '../../../services/signos-vitales.service';

import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-atencion-signos-vitales',
  templateUrl: './atencion-signos-vitales.component.html',
  styleUrls: ['./atencion-signos-vitales.component.css'],
})
export class AtencionSignosVitalesComponent implements OnInit {
  cita!: any;
  id_consulta!: string;
  peso!: number;
  talla!: number;
  ccintura!: number;
  pulso!: number;
  sat!: number;
  pam1!: number;
  pam2!: number;
  temp!: number;
  fresp!: number;
  fecha!: any;
  disabledFlag: boolean = false;
  constructor(
    private signosVitalesService: SignosVitalesService,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.fecha = moment(new Date()).format('YYYY/MM/DD').split('/').join('-');
    this.cita = signosVitalesService.getCita();
    signosVitalesService
      .obtenerSignosVitalesPorId(this.cita.id_consulta)
      .subscribe((resp) => {
        console.log(resp);
        if (resp.length !== 0) {
          console.log(resp);
          const pam: any = resp.pam.split('/');
          this.disabledFlag = true;
          this.peso = resp.peso;
          this.talla = resp.talla;
          this.ccintura = resp.ccintura;
          this.pulso = resp.pulso;
          this.sat = resp.sat;
          this.pam1 = pam[0];
          this.pam2 = pam[1];
          this.temp = resp.temp;
          this.fresp = resp.fresp;
        } else {
          console.log('no hago nada 🦴');
        }
      });
  }

  guardarSignosVitales() {
    const nuevosSignosVitales = {
      id_consulta: this.cita.id_consulta,
      id_paciente: this.cita.rut,
      id_usuario_sv: this.usuario.rut,
      fecha: this.fecha,
      peso: this.peso,
      talla: this.talla,
      ccintura: this.ccintura,
      pulso: this.pulso,
      sat: this.sat,
      pam: `${this.pam1}/${this.pam2}`,
      temp: this.temp,
      fresp: this.fresp,
      imc: this.imc,
      estado_nutri: this.estadoNutri,
    };
    Swal.fire({
      title: '¿Desea confirmar el envío?',
      text: '¡Luego de enviados, los datos no se pueden cambiar!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#111b54',
      cancelButtonColor: '#deb01f',
      confirmButtonText: 'Si, enviar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.signosVitalesService
          .crarSignosVitales(nuevosSignosVitales)
          .subscribe((valido) => {
            if (valido === true) {
              Swal.fire(
                'Éxito',
                'Signos vitales registrados de forma correcta.',
                'success'
              );
              this.router.navigateByUrl('/dashboard/tens/signos-vitales');
            } else {
              Swal.fire('Error', valido, 'error');
            }
          });
      }
    });
  }

  get usuario() {
    return this.usuarioService.usuario;
  }

  get imc(): number {
    return this.peso / Math.pow(this.talla, 2);
  }

  get estadoNutri(): string {
    const imcTemp = this.imc;
    if (imcTemp < 18.5) return 'Bajo peso';
    if (imcTemp >= 18.5 && imcTemp <= 24.99) return 'Normal';
    if (imcTemp >= 25 && imcTemp < 30) return 'Sobrepeso';
    if (imcTemp >= 30) return 'Obesidad';
    return '';
  }

  ngOnInit(): void {}
}
