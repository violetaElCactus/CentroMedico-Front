import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SignosVitalesService {
  constructor(private http: HttpClient) {}
  private baseUrl: string = environment.baseUrl;

  private _zona: string = '';
  private _listaCitas: any[] = [];
  private _cita!: any;

  getZona() {
    return this._zona;
  }

  setZona(zona: string) {
    this._zona = zona;
  }

  getListaCitas() {
    return this._listaCitas;
  }

  setListaCitas(citas: any) {
    this._listaCitas = citas;
  }

  getCita() {
    return this._cita;
  }

  setCita(cita: any) {
    this._cita = cita;
  }

  obtenerCitasPorFechaZona(fecha: string, zona: string) {
    const url = `${this.baseUrl}/cita/${fecha}/${zona}`;
    return this.http.get<any>(url);
  }

  crarSignosVitales(nuevosSignosVitales: any) {
    const url = `${this.baseUrl}/signosvitales/new`;
    const body = { ...nuevosSignosVitales };
    return this.http.post<any>(url, body).pipe(
      map((resp) => resp.ok),
      catchError((err) => of(err.error.msg))
    );
  }

  //Por ID de consulta
  obtenerSignosVitalesPorId(idCita: any) {
    const url = `${this.baseUrl}/signosvitales/consulta/${idCita}`;
    return this.http.get<any>(url);
  }

  obtenerSignosVistalesPorPaciente(idPaciente: any) {
    const url = `${this.baseUrl}/signosvitales/paciente/${idPaciente}`;
    return this.http.get<any>(url);
  }
}
