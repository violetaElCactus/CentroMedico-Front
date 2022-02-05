export interface Box {
  nombre: string;
  zona: string;
  etiquetaUso?: string;
  habilitado: number;
}

export interface BoxResponse {
  ok: boolean;
  msg?: string;
}

export interface BoxResponse {
  nro_box: number;
  zona: string;
  uso: string;
  habilitado: number;
}

export interface BoxTabla {
  nro_box: number;
  zona: string;
  uso: string;
  habilitado: number;
}

export interface AsignacionBox {
  id_box: number;
  fecha: string;
  manana: string;
  tarde: string;
}
