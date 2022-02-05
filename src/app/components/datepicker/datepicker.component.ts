import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styles: [],
})
export class DatepickerComponent implements OnInit {
  model!: NgbDateStruct;
  constructor() {}
  @Output('fecha') fechaSalida: EventEmitter<any> = new EventEmitter();

  select(d: any) {
    const date = new Date(d.year, d.month, d.day);
    this.fechaSalida.emit(date);
  }
  ngOnInit(): void {}
}
