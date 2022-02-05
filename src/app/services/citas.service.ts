import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CitasService {
  constructor(private http: HttpClient) {}
  private baseUrl: string = environment.baseUrl;

  crearCita(citaNueva: any) {
    const url = `${this.baseUrl}/cita/new`;
    const body = { ...citaNueva };
    return this.http.post<any>(url, body).pipe(
      map((resp) => resp),
      catchError((err) => of(err.error.msg))
    );
  }

  obtenerCitasPorFecha(fecha: string) {
    const url = `${this.baseUrl}/cita/${fecha}`;
    return this.http.get<any>(url);
  }

  obtenerCitasConEstado(fecha: string) {
    const url = `${this.baseUrl}/cita/${fecha}/estado`;
    return this.http.get<any>(url);
  }

  actualizarCita(citaActualizada: any) {
    const url = `${this.baseUrl}/cita/update`;
    const body = { ...citaActualizada };
    return this.http.put<any>(url, body).pipe(
      map((resp) => resp.ok),
      catchError((err) => of(err.error.msg))
    );
  }

  obtenerCitasPorZonaFecha(fecha: string, zona: string) {
    const url = `${this.baseUrl}/cita/${fecha}/${zona}`;
    return this.http.get<any>(url);
  }

  obtenerCitaPorHorario(hora: string, fecha: string, id_lugar: string) {
    const url = `${this.baseUrl}/cita/${hora}/${fecha}/${id_lugar}`;
    return this.http.get<any>(url);
  }

  obtenerEstadisticas() {
    const url = `${this.baseUrl}/cita/estadistica`;
    return this.http.get<any>(url);
  }

  confirmarCita(citaActualizada: any) {
    const url = `${this.baseUrl}/cita/confirmar`;
    const body = { ...citaActualizada };
    return this.http.put<any>(url, body).pipe(
      map((resp) => resp.ok),
      catchError((err) => of(err.error.msg))
    );
  }

  asistirCita(citaActualizada: any) {
    const url = `${this.baseUrl}/cita/asistida`;
    const body = { ...citaActualizada };
    return this.http.put<any>(url, body).pipe(
      map((resp) => resp.ok),
      catchError((err) => of(err.error.msg))
    );
  }

  obtenerCitaPorID(id: string) {
    const url = `${this.baseUrl}/cita/id/${id}`;
    return this.http.get<any>(url);
  }
}
