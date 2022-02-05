import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Paciente } from '../interfaces/paciente';

@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  constructor(private http: HttpClient) {}
  private baseUrl: string = environment.baseUrl;
  private mensajeCabecera!: string;

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

  /**
   * Permite registrar un nuevo usuario
   */
  registrarPaciente(paciente: any) {
    const url = `${this.baseUrl}/paciente/new`;
    const body = { ...paciente };
    return this.http.post<any>(url, body).pipe(
      map((resp) => resp.ok),
      catchError((err) => of(err.error.msg))
    );
  }

  /**
   * Obtener todos los pacientes
   */
  obtenerPacientes() {
    const url = `${this.baseUrl}/paciente/`;
    return this.http.get<any>(url);
  }

  /**
   * Obtener paciente utilizando el rut como atributo discriminador
   */
  obtenerPacientePorRut(rut: string) {
    const url = `${this.baseUrl}/paciente/${rut}`;
    return this.http.get<any>(url);
  }

  /**Actualizar información del usuario */
  actualizarPacientePorRut(pacienteActualizado: Paciente, rut: string) {
    const url = `${this.baseUrl}/paciente/${rut}`;
    const body = { ...pacienteActualizado };
    return this.http.put<any>(url, body).pipe(
      map((resp) => resp.ok),
      catchError((err) => of(err.error.msg))
    );
  }
}
