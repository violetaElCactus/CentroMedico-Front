import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { formatearFecha } from 'src/app/utils/formatearFecha';
import { EstadisticaService } from '../../../../services/estadistica.service';

@Component({
  selector: 'app-resumen-diario',
  templateUrl: './resumen-diario.component.html',
  styleUrls: ['./resumen-diario.component.css'],
})
export class ResumenDiarioComponent implements OnInit {
  mensajeCabecera!: string;
  fecha: any = this.route.snapshot.params['fecha'];
  //prettier-ignore
  medicina_general: any = {control: 0, ingreso: 0, mujer: 0, hombre: 0, nsp: 0, total_aten:0, total_agen:0};
  //prettier-ignore
  pediatria: any = { control: 0, ingreso: 0, mujer: 0, hombre: 0, nsp: 0, total_aten:0, total_agen: 0 };
  listaProcedimientos!: any;
  listaEspecialidad!: any;
  totalProcedimientos: number = 0;
  totalEspecialidad: number = 0;

  constructor(
    private route: ActivatedRoute,
    estadisticaService: EstadisticaService
  ) {
    this.mensajeCabecera = formatearFecha(this.fecha);
    estadisticaService.estadisticasDelDia(this.fecha).subscribe((resp) => {
      this.medicina_general = resp[0];
      this.pediatria = resp[1];
      //Calcula totales medicina_general
      this.medicina_general.total_aten =
        this.medicina_general.ingreso + this.medicina_general.control;
      this.medicina_general.total_agen =
        this.medicina_general.hombre +
        this.medicina_general.mujer +
        this.medicina_general.nsp;
      //Calcula totales pediatria
      this.pediatria.total_aten =
        this.pediatria.ingreso + this.pediatria.control;
      this.pediatria.total_agen =
        this.pediatria.hombre + this.pediatria.mujer + this.pediatria.nsp;
      console.log(this.medicina_general, this.pediatria);
    });

    estadisticaService
      .estadisticasDeProcedimientos(this.fecha)
      .subscribe((resp) => {
        console.log(resp);
        this.listaProcedimientos = resp;
        this.listaProcedimientos.forEach((proc) => {
          this.totalProcedimientos += proc.cantidad;
        });
      });

    estadisticaService
      .estadisticasDeEspecialidades(this.fecha)
      .subscribe((resp) => {
        console.log(resp);
        this.listaEspecialidad = resp;
        this.listaEspecialidad.forEach((esp) => {
          this.totalEspecialidad += esp.cantidad;
        });
      });
  }

  ngOnInit(): void {}
}
