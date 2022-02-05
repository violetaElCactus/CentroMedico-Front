import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatearProfesional',
})
export class FormatearProfesionalPipe implements PipeTransform {
  /**La profesión se pide para reutilizar el pipe en el futuro :D */
  transform(nombreCompleto: string, sexo: string, profesion?: string): string {
    return sexo === 'hombre'
      ? `Dr. ${nombreCompleto}`
      : `Dra. ${nombreCompleto}`;
  }
}
