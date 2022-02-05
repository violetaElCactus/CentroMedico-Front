import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inicialesPaciente',
})
export class InicialesPacientePipe implements PipeTransform {
  transform(nombreCompleto: any): string {
    let iniciales = '';
    nombreCompleto.split(' ').map((e: string) => {
      iniciales += e[0];
    });

    return iniciales;
  }
}
