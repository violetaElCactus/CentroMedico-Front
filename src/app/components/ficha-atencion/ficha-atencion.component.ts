import { Component, OnInit } from '@angular/core';
import { MedicinaService } from '../../services/medicina.service';

@Component({
  selector: 'app-ficha-atencion',
  templateUrl: './ficha-atencion.component.html',
  styleUrls: ['./ficha-atencion.component.css'],
})
export class FichaAtencionComponent implements OnInit {
  listaAtenciones: any = [];
  constructor(private medicinaService: MedicinaService) {
    const rut = this.medicinaService._rutPaciente;
    this.medicinaService.obtenerAtencionesPorRut(rut).subscribe((resp) => {
      console.log(resp);
      if (resp !== []) {
        this.listaAtenciones = resp;
      }
    });
  }

  ngOnInit(): void {}
}
