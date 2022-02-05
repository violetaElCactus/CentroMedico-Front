import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'listFilter' })
export class ListFilterPipe implements PipeTransform {
  transform(lista: any[], valorBusqueda: string): any {
    if (!lista || !valorBusqueda) return lista;
    return lista.filter(
      (elem) =>
        elem.nombre
          .toLocaleLowerCase()
          .includes(valorBusqueda.toLocaleLowerCase()) ||
        elem.apellido
          .toLocaleLowerCase()
          .includes(valorBusqueda.toLocaleLowerCase()) ||
        elem.rut.toLocaleLowerCase().includes(valorBusqueda.toLocaleLowerCase())
    );
  }
}
