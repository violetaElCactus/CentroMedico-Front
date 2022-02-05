import { Component, Input, OnInit } from '@angular/core';

import { BoxTabla } from 'src/app/interfaces/box.interface';

const BOX: BoxTabla[] = [
  {
    nro_box: 0,
    zona: 'No aplica',
    uso: 'No aplica',
    habilitado: 0,
  },
];

@Component({
  selector: 'app-tabla-box',
  templateUrl: './tabla-box.component.html',
  styleUrls: ['./tabla-box.component.css'],
})
export class TablaBoxComponent implements OnInit {
  @Input() boxes: any[] = BOX;
  page = 1;
  pageSize = 10;
  collectionSize = this.boxes.length;

  constructor() {
    this.refreshBoxes();
  }

  refreshBoxes() {
    this.boxes = this.boxes
      .map((boxes, i) => ({
        id: i + 1,
        ...boxes,
      }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

  ngOnInit(): void {}
}
