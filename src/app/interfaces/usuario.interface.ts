export interface UsuarioTabla {
  nombreCompleto: string;
  email: string;
  contacto: string;
  roles?: UsuarioRol[];
  estado?: string;
  usuariosDB?: any;
}

export interface UsuarioRol {
  rol: string;
}

export interface Usuario {
  uid: string;
  rut: string;
  nombre: string;
  apellido: string;
  rol: number;
}

export interface UsuarioNuevo {
  rut: string;
  nombre: string;
  apellido: string;
  nacimiento: any;
  telefono: string;
  correo_electronico: string;
  sexo: string;
  rol_coordinacion: boolean;
  rol_profesional: boolean;
  rol_direccion: boolean;
  rol_administrativo: boolean;
  area_medica: string[];
  area_administrativa: string[];
}

export interface UsuarioDB {
  rut: string;
  nombre: string;
  apellido: string;
  fecha_nacimiento: string;
  telefono: string;
  correo_electronico: string;
  sexo: string;
  coordinacion?: number;
  direccion?: number;
  profesional?: number;
  administrativo?: number;
  medicina_general?: number;
  pediatria?: number;
  cardiologia?: number;
  cirugia?: number;
  gine_obste?: number;
  traumatologia?: number;
  psiquiatria?: number;
  nutricion?: number;
  matroneria?: number;
  enfermeria?: number;
  tens?: number;
  tec_medica?: number;
  radiologia?: number;
  kinesiologia?: number;
  recepcion?: number;
  farmacia?: number;
}

export interface AuthResponse {
  ok: boolean;
  uid?: string;
  rut: string;
  nombre: string;
  apellido: string;
  rol: number;
  token?: string;
  msg?: string;
}
