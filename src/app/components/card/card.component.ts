import { Component, Input, OnInit } from '@angular/core';

import { Card } from 'src/app/interfaces/card.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() tarjeta: Card = {
    titulo: 'Sin titulo',
    cantidad: 0,
    icono: 'fas fa-circle',
  };
  constructor() {}

  ngOnInit(): void {}
}
