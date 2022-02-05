export interface SignosVitales {
  cita?: any;
  id_consulta?: string;
  peso?: number;
  talla?: number;
  ccintura?: number;
  pulso?: number;
  sat?: number;
  pam1?: number;
  pam2?: number;
  temp?: number;
  fresp?: number;
  imc?: number;
  estado_nutri?: string;
}

export interface SignosVitalesRes {
  cita?: any;
  id_consulta?: string;
  peso?: number;
  talla?: number;
  ccintura?: number;
  pulso?: number;
  sat?: number;
  pam?: number;
  temp?: number;
  fresp?: number;
  imc?: number;
  estado_nutri?: string;
  fecha?: string;
  length: number;
}
