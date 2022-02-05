import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**Inicio */
import { InicioComponent } from './inicio/inicio.component';
import { PerfilComponent } from './inicio/perfil/perfil.component';

/**Coordinador */
import { UsuariosComponent } from './administrador/usuarios/usuarios.component';
import { AgregarUsuariosComponent } from './administrador/usuarios/agregar-usuarios/agregar-usuarios.component';
import { DetalleUsuarioComponent } from './administrador/usuarios/detalle-usuario/detalle-usuario.component';
import { BoxComponent } from './administrador/box/box.component';
import { AgendarBoxComponent } from './administrador/box/agendar-box/agendar-box.component';
import { GestionarBoxComponent } from './administrador/box/gestionar-box/gestionar-box.component';
import { AgregarBoxComponent } from './administrador/box/agregar-box/agregar-box.component';
import { DetalleBoxComponent } from './administrador/box/gestionar-box/detalle-box/detalle-box.component';
import { EstadisticasComponent } from './administrador/estadisticas/estadisticas.component';
import { ResumenDiarioComponent } from './administrador/estadisticas/resumen-diario/resumen-diario.component';
import { ResumenMensualComponent } from './administrador/estadisticas/resumen-mensual/resumen-mensual.component';

/**Recepcionista */
import { RecepcionistaComponent } from './recepcionista/recepcionista.component';
import { ListaPacientesComponent } from './recepcionista/lista-pacientes/lista-pacientes.component';
import { ModificarPacienteComponent } from './recepcionista/modificar-paciente/modificar-paciente.component';
import { AgendarCitaComponent } from './recepcionista/agendar-cita/agendar-cita.component';
import { CitasAgendadasComponent } from './recepcionista/agendar-cita/citas-agendadas/citas-agendadas.component';
import { CrearCitaComponent } from './recepcionista/crear-cita/crear-cita.component';
import { CitasCreadasComponent } from './recepcionista/crear-cita/citas-creadas/citas-creadas.component';
import { AgendarProcedimientoComponent } from './recepcionista/agendar-procedimiento/agendar-procedimiento.component';
import { ProcedimientosAgendadosComponent } from './recepcionista/agendar-procedimiento/procedimientos-agendados/procedimientos-agendados.component';

/**Tens */
import { EnfermeriaComponent } from './enfermeria/enfermeria.component';
import { AtencionSignosVitalesComponent } from './enfermeria/atencion-signos-vitales/atencion-signos-vitales.component';

/**Medicina */
import { FichasClinicasComponent } from './medicina/fichas-clinicas/fichas-clinicas.component';
import { CitasMedicasComponent } from './medicina/citas-medicas/citas-medicas.component';
import { FichaPacienteComponent } from './medicina/ficha-paciente/ficha-paciente.component';

const routes: Routes = [
  /**Rutas inicio y perfil */
  { path: '', component: InicioComponent },
  { path: 'perfil', component: PerfilComponent },

  /**Rutas de coordinador */

  //Gestionar usuarios
  {
    path: 'administrador/usuarios',
    component: UsuariosComponent,
    pathMatch: 'full',
  },
  //Gestión de usuarios
  {
    path: 'administrador/usuarios/agregar',
    component: AgregarUsuariosComponent,
  },
  {
    path: 'administrador/usuarios/detalle/:id',
    component: DetalleUsuarioComponent,
  },
  //Gestión de box
  { path: 'administrador/box', component: BoxComponent },
  {
    path: 'administrador/box/gestionar-box',
    component: GestionarBoxComponent,
    pathMatch: 'full',
  },
  { path: 'administrador/box', component: BoxComponent },
  {
    path: 'administrador/box/gestionar-box/detalle/:id',
    component: DetalleBoxComponent,
    pathMatch: 'full',
  },
  {
    path: 'administrador/box/gestionar-box/agregar',
    component: AgregarBoxComponent,
    pathMatch: 'full',
  },
  { path: 'administrador/box/:fecha', component: AgendarBoxComponent },
  {
    path: 'administrador/estadisticas',
    component: EstadisticasComponent,
    pathMatch: 'full',
  },
  {
    path: 'administrador/estadisticas/diario/:fecha',
    component: ResumenDiarioComponent,
    pathMatch: 'full',
  },
  {
    path: 'administrador/estadisticas/mensual',
    component: ResumenMensualComponent,
    pathMatch: 'full',
  },

  /**Rutas de recepción */

  {
    path: 'recepcionista/inicio',
    component: RecepcionistaComponent,
    pathMatch: 'full',
  },
  {
    path: 'recepcionista/lista-pacientes',
    component: ListaPacientesComponent,
    pathMatch: 'full',
  },
  {
    path: 'recepcionista/lista-pacientes/editar/:rut',
    component: ModificarPacienteComponent,
    pathMatch: 'full',
  },
  {
    path: 'recepcionista/agendar-cita',
    component: AgendarCitaComponent,
    pathMatch: 'full',
  },
  {
    path: 'recepcionista/agendar-cita/:fecha',
    component: CitasAgendadasComponent,
    pathMatch: 'full',
  },
  {
    path: 'recepcionista/agendar-procedimiento',
    component: AgendarProcedimientoComponent,
    pathMatch: 'full',
  },
  {
    path: 'recepcionista/agendar-procedimiento/:fecha',
    component: ProcedimientosAgendadosComponent,
    pathMatch: 'full',
  },
  {
    path: 'recepcionista/crear-cita',
    component: CrearCitaComponent,
    pathMatch: 'full',
  },
  {
    path: 'recepcionista/crear-cita/:fecha',
    component: CitasCreadasComponent,
    pathMatch: 'full',
  },

  /**Signos vitales */
  {
    path: 'tens/signos-vitales',
    component: EnfermeriaComponent,
    pathMatch: 'full',
  },
  {
    path: 'tens/signos-vitales/:cita',
    component: AtencionSignosVitalesComponent,
    pathMatch: 'full',
  },
  /**Medicina */

  {
    path: 'medicina/pacientes',
    component: FichasClinicasComponent,
    pathMatch: 'full',
  },
  {
    path: 'medicina/citas-medicas',
    component: CitasMedicasComponent,
    pathMatch: 'full',
  },
  {
    path: 'medicina/citas-medicas/:cita/:rut',
    component: FichaPacienteComponent,
    pathMatch: 'full',
  },
  {
    path: 'medicina/ficha-paciente/:rut',
    component: FichaPacienteComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChildRoutesModule {}
