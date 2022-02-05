export interface Antecedentes {
  id_antadultos?: number;
  rut_paciente?: string;
  morb?: string; //morb_ad
  trat_morb?: string; //ttmorb_ad
  ant_quirurgico?: string; // antqx_ad
  alergias?: string; //alergias_ad
  inmuni?: string; //inmun_ad
  menarquia?: string; //menar_ad ?
  fecha_ult_regla?: string; // fur_ad ?
  g_ad?: string; // g_ad ?
  p_ad?: string; // a_ad ?
  a_ad?: string; // mac_ad ?
  mac_ad?: string; // meno_ad
  menopausia?: string; // pap_ad
  papanicolaou?: string; // p_ad
  tabaco?: string; // tab_ad
  cant_cig?: string; // ncig_ad
  anios_cig?: string; // acig_ad
  alcohol?: string; // oh_ad
  cant_alcohol?: string; // noh_ad
  tiempo_alcohol?: string; // voh_ad
  drogas?: string; // drogas_ad
  otra_droga?: string; // otra_droga_ad
  ejercicio?: string; // eje_ad
  cant_ejercicio?: string; // veje_ad
  min_ejercicio?: string; // mineje_ad
  medic_habitual?: string; // medhab
  ocupacion?: string; // ocupacion_ad
  estado_civil?: string; // edociv_ad
  niv_educacion?: string; // edu_ad
  antec_familiar?: string; // afam_ad
  antec_social?: string; // asoc_ad
}
