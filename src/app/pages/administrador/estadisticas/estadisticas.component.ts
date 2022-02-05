import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  mesSelect: any = '';
  anioSelect: string = '';
  meses: any[] = [{nombre: 'Enero',valor: '01' },
  {nombre: 'Febrero',valor: '02' },
  {nombre: 'Marzo',valor: '03' },
  {nombre: 'Abril',valor: '04' },
  {nombre: 'Mayo',valor: '05' },
  {nombre: 'Junio',valor: '06' },
  {nombre: 'Julio',valor: '07' },
  {nombre: 'Agosto',valor: '08' },
  {nombre: 'Septiembre',valor: '09' },
  {nombre: 'Octubre',valor: '10' },
  {nombre: 'Noviembre',valor: '11' },
  {nombre: 'Diciembre',valor: '12' },];
  anios: string[] = ['2022','2023','2024','2025','2026','2027','2028','2029','2030','2031','2032'];
  
  constructor() { }

  ngOnInit(): void {
  }

}
