import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { PagesComponent } from './pages.component';
import { InicioComponent } from './inicio/inicio.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { UsuariosComponent } from './administrador/usuarios/usuarios.component';
import { BoxComponent } from './administrador/box/box.component';
import { AgregarUsuariosComponent } from './administrador/usuarios/agregar-usuarios/agregar-usuarios.component';
import { AgendarBoxComponent } from './administrador/box/agendar-box/agendar-box.component';
import { GestionarBoxComponent } from './administrador/box/gestionar-box/gestionar-box.component';

import { NumToDatePipe } from '../pipes/num-to-date.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgregarBoxComponent } from './administrador/box/agregar-box/agregar-box.component';
import { DetalleBoxComponent } from './administrador/box/gestionar-box/detalle-box/detalle-box.component';
import { DetalleUsuarioComponent } from './administrador/usuarios/detalle-usuario/detalle-usuario.component';
import { PerfilComponent } from './inicio/perfil/perfil.component';
import { RecepcionistaComponent } from './recepcionista/recepcionista.component';
import { ListaPacientesComponent } from './recepcionista/lista-pacientes/lista-pacientes.component';
import { ModificarPacienteComponent } from './recepcionista/modificar-paciente/modificar-paciente.component';
import { AgendarCitaComponent } from './recepcionista/agendar-cita/agendar-cita.component';
import { CitasAgendadasComponent } from './recepcionista/agendar-cita/citas-agendadas/citas-agendadas.component';
import { CrearCitaComponent } from './recepcionista/crear-cita/crear-cita.component';
import { CitasCreadasComponent } from './recepcionista/crear-cita/citas-creadas/citas-creadas.component';
import { EstadisticasComponent } from './administrador/estadisticas/estadisticas.component';
import { EnfermeriaComponent } from './enfermeria/enfermeria.component';
import { AtencionSignosVitalesComponent } from './enfermeria/atencion-signos-vitales/atencion-signos-vitales.component';
import { MedicinaComponent } from './medicina/medicina.component';
import { FichasClinicasComponent } from './medicina/fichas-clinicas/fichas-clinicas.component';
import { CitasMedicasComponent } from './medicina/citas-medicas/citas-medicas.component';
import { FichaPacienteComponent } from './medicina/ficha-paciente/ficha-paciente.component';
import { AgendarProcedimientoComponent } from './recepcionista/agendar-procedimiento/agendar-procedimiento.component';
import { ProcedimientosAgendadosComponent } from './recepcionista/agendar-procedimiento/procedimientos-agendados/procedimientos-agendados.component';
import { ResumenDiarioComponent } from './administrador/estadisticas/resumen-diario/resumen-diario.component';
import { ResumenMensualComponent } from './administrador/estadisticas/resumen-mensual/resumen-mensual.component';

@NgModule({
  declarations: [
    PagesComponent,
    InicioComponent,
    AdministradorComponent,
    UsuariosComponent,
    BoxComponent,
    AgregarUsuariosComponent,
    AgendarBoxComponent,
    GestionarBoxComponent,
    NumToDatePipe,
    AgregarBoxComponent,
    DetalleBoxComponent,
    DetalleUsuarioComponent,
    PerfilComponent,
    RecepcionistaComponent,
    ListaPacientesComponent,
    ModificarPacienteComponent,
    AgendarCitaComponent,
    CitasAgendadasComponent,
    CrearCitaComponent,
    CitasCreadasComponent,
    EstadisticasComponent,
    EnfermeriaComponent,
    AtencionSignosVitalesComponent,
    MedicinaComponent,
    FichasClinicasComponent,
    CitasMedicasComponent,
    FichaPacienteComponent,
    AgendarProcedimientoComponent,
    ProcedimientosAgendadosComponent,
    ResumenDiarioComponent,
    ResumenMensualComponent,
 
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    NgbModule,
  ],
})
export class PagesModule {}
