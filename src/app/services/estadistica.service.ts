import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EstadisticaService {
  constructor(private http: HttpClient) {}
  private baseUrl: string = environment.baseUrl;

  obtenerPacientes() {
    const url = `${this.baseUrl}/estadistica/dashboard`;
    return this.http.get<any>(url);
  }

  obtenerCitasSemestre(fecha: any) {
    const url = `${this.baseUrl}/estadistica/dashboard/${fecha}`;
    return this.http.get<any>(url);
  }

  obtenerCitasPorDia(fecha: any) {
    const url = `${this.baseUrl}/estadistica/citas/${fecha}`;
    return this.http.get<any>(url);
  }

  estadisticasDelDia(fecha: any) {
    const url = `${this.baseUrl}/estadistica/citas/dia/${fecha}`;
    return this.http.get<any>(url);
  }

  estadisticasDeProcedimientos(fecha: any) {
    const url = `${this.baseUrl}/estadistica/procedimientos/dia/${fecha}`;
    return this.http.get<any>(url);
  }

  estadisticasDeEspecialidades(fecha: any) {
    const url = `${this.baseUrl}/estadistica/especialidades/dia/${fecha}`;
    return this.http.get<any>(url);
  }
}
