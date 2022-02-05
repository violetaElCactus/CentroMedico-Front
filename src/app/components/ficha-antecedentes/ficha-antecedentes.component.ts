import { Component, OnInit } from '@angular/core';
import { Antecedentes } from 'src/app/interfaces/antecedentes';
import { MedicinaService } from '../../services/medicina.service';

@Component({
  selector: 'app-ficha-antecedentes',
  templateUrl: './ficha-antecedentes.component.html',
  styleUrls: ['./ficha-antecedentes.component.css'],
})
export class FichaAntecedentesComponent implements OnInit {
  antecedentes: Antecedentes = {} as Antecedentes;

  constructor(private medicinaService: MedicinaService) {
    const rut = this.medicinaService._rutPaciente;
    this.medicinaService.obtenerAntecedentesPorRut(rut).subscribe((resp) => {
      console.log(resp);

      this.antecedentes = resp;
    });
  }

  ngOnInit(): void {}
}
