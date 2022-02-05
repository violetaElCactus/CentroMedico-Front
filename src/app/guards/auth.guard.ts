import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private usuarioService: UsuarioService, private router: Router) {}

  canActivate(): Observable<boolean> | boolean {
    return this.usuarioService.validarToken().pipe(
      tap((valid) => {
        if (!valid) {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }
  canLoad(): Observable<boolean> | boolean {
    return this.usuarioService.validarToken().pipe(
      tap((valid) => {
        if (!valid) {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }
}
