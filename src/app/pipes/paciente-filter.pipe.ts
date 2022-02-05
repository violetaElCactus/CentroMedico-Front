import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pacienteFilter',
})
export class PacienteFilterPipe implements PipeTransform {
  transform(lista: any[], valorBusqueda: string): any {
    if (!lista || !valorBusqueda) return lista;
    return lista.filter(
      (elem) =>
        elem.nombre_paciente
          .toLocaleLowerCase()
          .includes(valorBusqueda.toLocaleLowerCase()) ||
        //área médica
        elem.valor
          .toLocaleLowerCase()
          .includes(valorBusqueda.toLocaleLowerCase())
    );
  }
}
