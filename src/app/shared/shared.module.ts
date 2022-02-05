import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { FormatearFechaPipe } from '../pipes/formatear-fecha.pipe';
import { ListFilterPipe } from '../pipes/list-filter.pipe';
import { PacienteFilterPipe } from '../pipes/paciente-filter.pipe';
import { InicialesPacientePipe } from '../pipes/iniciales-paciente.pipe';
import { FormatearRutPipe } from '../pipes/formatear-rut.pipe';
import { FormatearProfesionalPipe } from '../pipes/formatear-profesional.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FormatearFechaPipe,
    ListFilterPipe,
    PacienteFilterPipe,
    InicialesPacientePipe,
    FormatearRutPipe,
    FormatearProfesionalPipe,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    HeaderComponent,
    SidebarComponent,
    FormatearFechaPipe,
    ListFilterPipe,
    PacienteFilterPipe,
    InicialesPacientePipe,
    FormatearRutPipe,
    FormatearProfesionalPipe,
  ],
})
export class SharedModule {}
