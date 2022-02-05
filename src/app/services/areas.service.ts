import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root',
  })
  export class AreasService {
    constructor(private http: HttpClient) {}
    private baseUrl: string = environment.baseUrl;
  
    /**Permite obtener la lista de áreas médicas registradas en el sistema*/
  
    obtenerAreas(fecha: string) {
      const url = `${this.baseUrl}/areas/${fecha}`;
      return this.http.get<any>(url);
    }
}