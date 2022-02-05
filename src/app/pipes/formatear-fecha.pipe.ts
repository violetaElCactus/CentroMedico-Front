import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatearFecha',
})
export class FormatearFechaPipe implements PipeTransform {
  dias: string[] = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ];

  meses: string[] = [
    'Enero',
    'Febero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  fechaFormateada!: string;

  transform(fecha: any): string {
    const numeroDia = new Date(`${fecha} 10:10:10`).getDay();
    const nombreDia = this.dias[numeroDia];
    const dias = fecha.split('-');
    return (this.fechaFormateada = `${nombreDia}, ${dias[2]} de ${
      this.meses[dias[1] - 1]
    } de ${dias[0]}`);
  }
}
