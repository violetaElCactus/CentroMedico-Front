import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { AsignacionBox, Box, BoxResponse } from '../interfaces/box.interface';

import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoxService {
  private baseUrl: string = environment.baseUrl;

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

  // prettier-ignore
  horarios: string[] = [
    '08:00','08:30','09:00','09:30','10:00',
    '10:30','11:00','11:30','12:00','12:30',
    '13:00','13:30','14:00','14:30','15:00',
    '15:30','16:00'
  ]
  mensajeCabecera!: string;

  bloquesHorarios!: string[];
  cantidadBloques: number = 10;

  constructor(private http: HttpClient) {}

  formatearFecha(fecha: any): string {
    const numeroDia = new Date(`${fecha} 10:10:10`).getDay();
    const nombreDia = this.dias[numeroDia];
    const dias = fecha.split('-');
    return (this.mensajeCabecera = `${nombreDia}, ${dias[2]} de ${
      this.meses[dias[1] - 1]
    } de ${dias[0]}`);
  }

  /** Crear box */
  crearBox(box: Box) {
    const url = `${this.baseUrl}/box/new`;
    const body = { ...box };
    return this.http.post<BoxResponse>(url, body).pipe(
      map((resp) => resp.ok),
      catchError((err) => of(err.error.msg))
    );
  }

  /**Obtener boxes registrados */
  obtenerBoxes() {
    const url = `${this.baseUrl}/box/`;
    return this.http.get<any[]>(url);
  }

  /**Obtener detalle de box */
  obtenerBoxPorId(id: string) {
    const url = `${this.baseUrl}/box/${id}`;
    return this.http.get<any>(url);
  }

  /**Actualizar información del box */
  actualizarBoxPorId(id: string, boxActualizado: Box) {
    const url = `${this.baseUrl}/box/update/${id}`;
    const body = { ...boxActualizado };
    return this.http.put<BoxResponse>(url, body).pipe(
      map((resp) => resp.ok),
      catchError((err) => of(err.error.msg))
    );
  }

  /**Obtiene los boxes asignados durante una determinada fecha */
  obtenerAsignacionBoxes(fecha: string) {
    const url = `${this.baseUrl}/box/asignacion/${fecha}`;
    return this.http.get<any>(url);
  }

  /**Permite ingresar una asignación de box al sistema */
  asignarBox(nuevaAsignacion: AsignacionBox, fecha: string) {
    const url = `${this.baseUrl}/box/asignacion/${fecha}`;
    const body = { ...nuevaAsignacion };
    return this.http.post<any>(url, body).pipe(
      map((resp) => resp.ok),
      catchError((err) => of(err.error.msg))
    );
  }

  actualizarAsignacion(asignacionActualizada: AsignacionBox, fecha: string) {
    const url = `${this.baseUrl}/box/asignacion/update/${fecha}/${asignacionActualizada.id_box}`;
    const body = { ...asignacionActualizada };
    return this.http.put<any>(url, body).pipe(
      map((resp) => resp.ok),
      catchError((err) => of(err.error.msg))
    );
  }
}
