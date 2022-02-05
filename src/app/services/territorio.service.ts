import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TerritorioService {
  constructor(private http: HttpClient) {}
  private baseUrl: string = environment.baseUrl;

  /**Permite obtener la lista de regiones registradas en el sistema*/

  obtenerRegiones() {
    const url = `${this.baseUrl}/territorio/regiones`;
    return this.http.get<any>(url);
  }

  /**Permite obtener la lista de comunas a partir de una ID de región */
  obtenerComunasDeRegion(region: any) {
    const url = `${this.baseUrl}/territorio/comunas/${region}`;
    return this.http.get<any>(url);
  }
}
