import { Component, OnInit } from '@angular/core';

import { BoxService } from '../../../../services/box.service';

@Component({
  selector: 'app-gestionar-box',
  templateUrl: './gestionar-box.component.html',
  styleUrls: ['./gestionar-box.component.css'],
})
export class GestionarBoxComponent implements OnInit {
  boxesTabla: any[] = [];
  constructor(private boxService: BoxService) {
    this.boxService.obtenerBoxes().subscribe((resp) => {
      this.boxesTabla = resp;
    });
  }

  ngOnInit(): void {}
}
