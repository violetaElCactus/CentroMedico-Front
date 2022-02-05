import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CardComponent } from './card/card.component';
import { GraficoLinealComponent } from './grafico-lineal/grafico-lineal.component';
import { EtiquetaMovimientoComponent } from './etiqueta-movimiento/etiqueta-movimiento.component';
import { TablaComponent } from './tabla/tabla.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarioComponent } from './calendario/calendario.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { TablaBoxComponent } from './tabla-box/tabla-box.component';
import { RouterModule } from '@angular/router';
import { TablaAsignarComponent } from './tabla-asignar/tabla-asignar.component';
import { SharedModule } from '../shared/shared.module';
import { TablaPacientesComponent } from './tabla-pacientes/tabla-pacientes.component';
import { CrearPacientesComponent } from './crear-pacientes/crear-pacientes.component';
import { DiccionarioPacientesComponent } from './diccionario-pacientes/diccionario-pacientes.component';
import { CalendarioCitasComponent } from './calendario-citas/calendario-citas.component';
import { TablaAgendarComponent } from './tabla-agendar/tabla-agendar.component';
import { FormularioMedicinaComponent } from './formulario-medicina/formulario-medicina.component';
import { ContenidoFichaComponent } from './contenido-ficha/contenido-ficha.component';
import { FichaAtencionComponent } from './ficha-atencion/ficha-atencion.component';
import { FichaAntecedentesComponent } from './ficha-antecedentes/ficha-antecedentes.component';
import { FichaExamenesComponent } from './ficha-examenes/ficha-examenes.component';
import { ComprobanteComponent } from './documentos/medicinaGeneral/comprobante/comprobante.component';
import { RecetaComponent } from './documentos/medicinaGeneral/receta/receta.component';
import { CertificadoComponent } from './documentos/medicinaGeneral/certificado/certificado.component';
import { FichaCertificadosComponent } from './ficha-certificados/ficha-certificados.component';
import { PerfilPacienteComponent } from './perfil-paciente/perfil-paciente.component';
import { SignosVitalesPacienteComponent } from './signos-vitales-paciente/signos-vitales-paciente.component';
import { EstMensualComponent } from './documentos/est-mensual/est-mensual.component';

@NgModule({
  declarations: [
    CardComponent,
    GraficoLinealComponent,
    EtiquetaMovimientoComponent,
    TablaComponent,
    CalendarioComponent,
    DatepickerComponent,
    TablaBoxComponent,
    TablaAsignarComponent,
    TablaPacientesComponent,
    CrearPacientesComponent,
    DiccionarioPacientesComponent,
    CalendarioCitasComponent,
    TablaAgendarComponent,
    FormularioMedicinaComponent,
    ContenidoFichaComponent,
    FichaAtencionComponent,
    FichaAntecedentesComponent,
    FichaExamenesComponent,
    ComprobanteComponent,
    EstMensualComponent,
    RecetaComponent,
    CertificadoComponent,
    FichaCertificadosComponent,
    PerfilPacienteComponent,
    SignosVitalesPacienteComponent,
  ],
  imports: [
    CommonModule,
    ChartsModule,
    NgbModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [
    CalendarioCitasComponent,
    CalendarioComponent,
    CardComponent,
    GraficoLinealComponent,
    EtiquetaMovimientoComponent,
    TablaAgendarComponent,
    TablaComponent,
    TablaBoxComponent,
    TablaAsignarComponent,
    TablaPacientesComponent,
    DatepickerComponent,
    DiccionarioPacientesComponent,
    ContenidoFichaComponent,
    EstMensualComponent,
  ],
  entryComponents: [FormularioMedicinaComponent],
})
export class ComponentsModule {}
