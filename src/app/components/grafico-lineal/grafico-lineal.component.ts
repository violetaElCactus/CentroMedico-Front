import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartType } from 'chart.js';
import * as moment from 'moment';
import { Color, Label } from 'ng2-charts';
import { EstadisticaService } from '../../services/estadistica.service';
import { establecerEtiquetasGrafico } from '../../utils/etiquetasGrafico';

@Component({
  selector: 'app-grafico-lineal',
  templateUrl: './grafico-lineal.component.html',
  styleUrls: ['./grafico-lineal.component.css'],
})
export class GraficoLinealComponent implements OnInit {
  lineChartData: ChartDataSets[] = [
    { data: [0, 72, 78, 75, 77, 75], label: 'Total citas: ' },
  ];
  lineChartLabels: Label[] = [];
  lineChartOptions = {
    responsive: true,
  };
  lineChartColors: Color[] = [
    {
      borderColor: '#DEB01F',
      backgroundColor: 'rgba(222, 176, 31, 0.3)',
    },
  ];
  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType: ChartType = 'line';

  fecha!: string;

  constructor(estadisticaService: EstadisticaService) {
    const formato = 'YYYY-MM-DD';
    const fechaActual = new Date();
    this.fecha = moment(fechaActual).format(formato);
    const arrayCantidades: any = [];
    estadisticaService.obtenerCitasSemestre(this.fecha).subscribe((resp) => {
      resp.map((el: any) => arrayCantidades.push(el.cantidad_cita));
      this.lineChartData = [{ data: arrayCantidades, label: 'Total citas: ' }];
    });
    this.lineChartLabels = establecerEtiquetasGrafico(this.fecha);
  }

  ngOnInit(): void {}
}
