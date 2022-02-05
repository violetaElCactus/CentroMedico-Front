import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numToDate',
})
export class NumToDatePipe implements PipeTransform {
  transform(valor: number): string {
    return valor < 10 ? `0${valor}:00` : `${valor}:00`;
  }
}
