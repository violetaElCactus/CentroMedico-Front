import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MedicinaService {
  _rutPaciente: string = '';
  _citaPaciente: string = '';

  /**Formulario atención*/
  _formAten: any = {
    mconsulta: '',
    aproxima_ad: '',
    deam_ad: '',
    facie_ad: '',
    piel_ad: '',
    emental_ad: '',
    aden_ad: '',
    cab_ad: '',
    cuello_ad: '',
    torax_ad: '',
    mamas_ad: '',
    corazon_ad: '',
    pulmones_ad: '',
    abd_ad: '',
    col_ad: '',
    eess_ad: '',
    eeii_ad: '',
    geni_ad: '',
    eneuro_ad: '',
    trectal_ad: '',
    dgcie10_ad: '',
    dgsec_ad: '',
    obsdg_ad: '',
    planest_ad: [{ value: '' }],
    med_ad: [{ medicamento: '', via: '', dosis: '', hrs: null, dias: null }],
    ind_ad: '',
    intern: [{ value: '' }],
    id_doctor: '',
  };

  /**Formulario antecedentes*/
  _formAntec: any = {
    morb: [],
    trat_morb: '',
    ant_quirurgico: '',
    alergias: '',
    inmuni: '',
    //Inicio mujer
    menarquia: '',
    fecha_ult_regla: '',
    g_ad: '',
    p_ad: '',
    a_ad: '',
    mac_ad: '',
    menopausia: '',
    papanicolaou: '',
    //Fin mujer
    tabaco: '',
    cant_cig: '',
    anios_cig: '',
    alcohol: '',
    cant_alcohol: '',
    tiempo_alcohol: '',
    drogas: [],
    otra_droga: '',
    ejercicio: '',
    cant_ejercicio: '',
    min_ejercicio: '',
    medic_habitual: '',
    ocupacion: '',
    estado_civil: '',
    niv_educacion: '',
    antec_familiar: '',
    antec_social: '',
  };

  constructor(private http: HttpClient) {}
  private baseUrl: string = environment.baseUrl;

  obtenerCitasMedicaPorRutFecha(id_medico: any, fecha: any) {
    const url = `${this.baseUrl}/medicina/cita/${id_medico}/${fecha}`;
    return this.http.get<any>(url);
  }

  sugerirDiagnostico(termino: string) {
    const url = `${this.baseUrl}/medicina/cie10/${termino}`;
    return this.http.get<any>(url).pipe(catchError(() => of([])));
  }

  crearDiagnostico(antecedentes: any, atencion: any) {
    const url = `${this.baseUrl}/medicina/new`;
    const body = { antecedentes, atencion };
    return this.http.post<any>(url, body).pipe(
      map((resp) => resp.ok),
      catchError((err) => of(err.error.msg))
    );
  }

  obtenerAntecedentesPorRut(rut: string) {
    const url = `${this.baseUrl}/medicina/antecedentes/${rut}`;
    return this.http.get<any>(url);
  }

  obtenerAtencionesPorRut(rut: string) {
    const url = `${this.baseUrl}/medicina/atenciones/${rut}`;
    return this.http.get<any>(url);
  }

  obtenerAtencionPorCita(id_cita: number) {
    const url = `${this.baseUrl}/medicina/atenciones/cita/${id_cita}`;
    return this.http.get<any>(url);
  }

  crearCertificado(certificado: any) {
    const url = `${this.baseUrl}/medicina/certificados/new`;
    const body = { certificado };
    return this.http.post<any>(url, body).pipe(
      map((resp) => resp.ok),
      catchError((err) => of(err.error.msg))
    );
  }

  obtenerCertificadosPorRut(rutPaciente: any) {
    const url = `${this.baseUrl}/medicina/certificados/${rutPaciente}`;
    return this.http.get<any>(url);
  }

  get formAten() {
    return { ...this._formAten };
  }

  get formAntec() {
    return { ...this._formAntec };
  }

  get rutPaciente() {
    return this._rutPaciente;
  }

  get citaPaciente() {
    return this._citaPaciente;
  }

  setFormAten(form: any) {
    this._formAten = { ...form };
  }

  setFormAntec(form: any) {
    this._formAntec = { ...form };
  }

  setRutPaciente(rut: string) {
    this._rutPaciente = rut;
  }

  setCitaPaciente(cita: string) {
    this._citaPaciente = cita;
  }
}
