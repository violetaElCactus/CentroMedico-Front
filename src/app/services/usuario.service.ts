import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import {
  AuthResponse,
  Usuario,
  UsuarioNuevo,
} from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient) {}
  private baseUrl: string = environment.baseUrl;
  private _usuario!: Usuario;

  AreaMedica: Array<any> = [
    { nombre: 'Medicina General', valor: 'medicina_general' },
    { nombre: 'Pediatría', valor: 'pediatria' },
    { nombre: 'Cardiología', valor: 'cardiologia' },
    { nombre: 'Cirugia', valor: 'cirugia' },
    { nombre: 'Ginecología y Obstetricia', valor: 'gine_obste' },
    { nombre: 'Traumatología', valor: 'traumatologia' },
    { nombre: 'Psiquiatría', valor: 'psiquiatria' },
    { nombre: 'Nutrición', valor: 'nutricion' },
    { nombre: 'Matronería', valor: 'matroneria' },
    { nombre: 'Enfermería', valor: 'enfermeria' },
    { nombre: 'Técnico enfermería', valor: 'tens' },
    { nombre: 'Tecnología médica', valor: 'tec_medica' },
    { nombre: 'Radiología', valor: 'radiologia' },
    { nombre: 'Kinesiología', valor: 'kinesiologia' },
  ];

  AreaAdministrativa: Array<any> = [
    { nombre: 'Recepción', valor: 'recepcion' },
    { nombre: 'Farmacia', valor: 'farmacia' },
  ];

  get usuario() {
    return { ...this._usuario };
  }

  /**
   * Permite registrar un nuevo usuario
   */

  registro(usuario: UsuarioNuevo) {
    const url = `${this.baseUrl}/usuario/new`;
    const body = { ...usuario };
    return this.http.post<AuthResponse>(url, body).pipe(
      map((resp) => resp.ok),
      catchError((err) => of(err.error.msg))
    );
  }

  /**
   * Permite ingresar al usuario al sistema
   */

  login(rut: string, clave: string) {
    const url = `${this.baseUrl}/usuario`;
    const body = {
      rut,
      clave,
    };

    return this.http.post<AuthResponse>(url, body).pipe(
      tap((resp) => {
        if (resp.ok) {
          localStorage.setItem('token', resp.token!);
          localStorage.setItem('rol', JSON.stringify(resp.rol)!);
        }
      }),
      map((resp) => resp.ok),
      catchError((err) => of(err.error.msg))
    );
  }

  /**
   * Valida el token de la sesión del usuario
   */
  validarToken(): Observable<boolean> {
    const url = `${this.baseUrl}/usuario/renew`;
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );

    return this.http.get<AuthResponse>(url, { headers }).pipe(
      map((resp) => {
        localStorage.setItem('token', resp.token!);
        this._usuario = {
          uid: resp.uid!,
          rut: resp.rut!,
          nombre: resp.nombre!,
          apellido: resp.apellido!,
          rol: resp.rol!,
        };
        return resp.ok;
      }),
      catchError((err) => of(false))
    );
  }

  /**
   * Obtener usuarios registrados
   */
  obtenerUsuarios() {
    const url = `${this.baseUrl}/usuario/`;
    return this.http.get<any[]>(url);
  }

  /**
   * Obtener usuario por identificador (rut)
   */
  obtenerUsuarioPorRut(rut: string) {
    const url = `${this.baseUrl}/usuario/${rut}`;
    return this.http.get<any>(url);
  }

  /**
   * Actualiza usuario por identificar (rut)
   */
  actualizarUsuarioPorRut(usuarioActualizado: UsuarioNuevo, rut: string) {
    const url = `${this.baseUrl}/usuario/${rut}`;
    const body = { ...usuarioActualizado };
    return this.http.put<any>(url, body).pipe(
      map((resp) => resp.ok),
      catchError((err) => of(err.error.msg))
    );
  }

  /**Validar PIN del usuario */
  validarPin(pin: string, rut: string) {
    const url = `${this.baseUrl}/usuario/validar/${rut}`;
    const body = pin;
    return this.http.post<any>(url, body).pipe(
      map((resp) => resp.ok),
      catchError((err) => of(err.error.msg))
    );
  }

  /**Reestablecer credenciales de un usuario */
  reestablecerCredenciales(rut: string) {
    const url = `${this.baseUrl}/usuario/reestablecer/${rut}`;
    return this.http.get<any>(url);
  }

  /**Cambiar contraseña*/
  cambiarPassword(rut: string, credencialesUsuario: any) {
    const url = `${this.baseUrl}/usuario/cambiar_password/${rut}`;
    const body = { ...credencialesUsuario };
    return this.http.put<any>(url, body).pipe(
      map((resp) => resp.ok),
      catchError((err) => of(err.error.msg))
    );
  }

  /**
   * Salir del sistema
   */
  logout() {
    localStorage.clear();
  }
}
