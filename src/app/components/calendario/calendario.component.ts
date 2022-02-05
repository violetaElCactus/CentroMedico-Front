import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as moment from 'moment';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css'],
})
export class CalendarioComponent implements OnInit {
  @Input() path!: string;
  semana: any = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo',
  ];

  monthSelect!: any[];
  dateSelect!: any;
  dateValue!: any;
  monthValue!: any;
  currentDay!: any;
  currentMonth!: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getDaysFromDate(1, 2022);
    this.currentDay = moment().date();
    this.currentMonth = moment().month() + 1;
    this.monthValue = this.dateSelect.month() + 1;
  }

  getDaysFromDate(month: any, year: any) {
    const startDate = moment(`${month}-01-${year}`, 'MM-DD-YYYY');
    const endDate = startDate.clone().endOf('month');
    this.dateSelect = startDate;
    const diffDays = endDate.diff(startDate, 'days', true);
    const numberDays = Math.round(diffDays);

    const arrayDays = Object.keys([...Array(numberDays)]).map((a: any) => {
      a = parseInt(a) + 1;
      const dayObject = moment(`${month}-01-${year}`, 'MM-DD-YYYY');
      return {
        name: dayObject.format('dddd'),
        value: a,
        indexWeek: dayObject.isoWeekday(),
      };
    });

    this.monthSelect = arrayDays;
  }

  changeMonth(flag: number) {
    if (flag < 0) {
      const prevDate = this.dateSelect.clone().subtract(1, 'month');
      this.getDaysFromDate(prevDate.format('MM'), prevDate.format('YYYY'));
      this.currentMonth--;
    } else {
      const nextDate = this.dateSelect.clone().add(1, 'month');
      this.getDaysFromDate(nextDate.format('MM'), nextDate.format('YYYY'));
      this.currentMonth++;
    }
  }

  clickDay(day: any) {
    const monthYear = this.dateSelect.format('YYYY-MM');
    const parse = `${monthYear}-${day.value}`;
    const objectDate = moment(parse, 'MM-DD');
    this.dateValue = objectDate;
    this.router.navigateByUrl(
      `dashboard/administrador/${this.path}/${this.dateValue._i}`
    );
  }
}
