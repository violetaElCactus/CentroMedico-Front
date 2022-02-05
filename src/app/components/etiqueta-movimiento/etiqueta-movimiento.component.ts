import { Component, Input, OnInit } from '@angular/core';

import { EtiquetaCita } from 'src/app/interfaces/etiqueta-cita.interface';

@Component({
  selector: 'app-etiqueta-movimiento',
  templateUrl: './etiqueta-movimiento.component.html',
  styleUrls: ['./etiqueta-movimiento.component.css'],
})
export class EtiquetaMovimientoComponent implements OnInit {
  @Input() movimiento: EtiquetaCita = {
    box: '1',
    zona: 'A',
    hora: '08:00',
    estado: true,
    profesional: 'Nombre Apellido',
  };
  constructor() {}

  ngOnInit(): void {}
}
