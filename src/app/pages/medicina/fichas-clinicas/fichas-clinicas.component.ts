import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PacienteService } from '../../../services/paciente.service';

import { Paciente } from 'src/app/interfaces/paciente';

@Component({
  selector: 'app-fichas-clinicas',
  templateUrl: './fichas-clinicas.component.html',
  styleUrls: ['./fichas-clinicas.component.css'],
})
export class FichasClinicasComponent implements OnInit {
  pacientes!: Paciente[];
  paciente!: Paciente;
  buscarPaciente!: string;
  closeResult = '';

  constructor(
    private pacienteService: PacienteService,
    private router: Router
  ) {
    this.pacienteService.obtenerPacientes().subscribe((resp) => {
      this.pacientes = resp;
      console.log(resp);
    });
  }

  verFichaPaciente(idPaciente: string) {
    this.router.navigateByUrl(
      `dashboard/medicina/ficha-paciente/${idPaciente}`
    );
  }

  ngOnInit(): void {}
}
