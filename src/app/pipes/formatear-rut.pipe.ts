import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'rut.js';
@Pipe({
  name: 'formatearRut',
})
export class FormatearRutPipe implements PipeTransform {
  transform(rut: string): string {
    return format(rut);
  }
}
