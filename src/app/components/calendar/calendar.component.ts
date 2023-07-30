import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListOverlayDirective } from './list-overlay/list-overlay.directive';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

export const months = [
  'Január',
  'Február',
  'Marec',
  'Apríl',
  'Máj',
  'Jún',
  'Júl',
  'August',
  'September',
  'Oktober',
  'November',
  'December',
];

interface TimeForm {
  hours: FormControl<number>;
  minutes?: FormControl<number>;
}

enum TimeEnum {
  HOURS = 'hours',
  MINUTES = 'minutes'
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, ListOverlayDirective, ReactiveFormsModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class DateTimePickerComponent {
  months = months;
  date = new Date(new Date().setDate(1));
  currentDay = new Date();
  currentYear = this.date.getFullYear();
  lastDay = new Date(
    this.date.getFullYear(),
    this.date.getMonth() + 1,
    0
  ).getDate();
  prevLastDay = new Date(
    this.date.getFullYear(),
    this.date.getMonth(),
    0
  ).getDate();
  firstDayIndex = this.date.getDay();
  lastDayIndex = new Date(
    this.date.getFullYear(),
    this.date.getMonth() + 1,
    0
  ).getDay();
  nextDays = 7 - this.lastDayIndex - 1;
  prevDays: number[] = [];
  currentDaysHashTable: any = {};
  currentDaysArray: any[] = [];
  lastDays: number[] = [];
  isSetHoursOpen = false;
  clickedDate: Date;
  currentClickedIndex: number;
  timeTypes = TimeEnum;
  timeForm = new FormGroup<TimeForm>({
    hours: new FormControl((new Date()).getHours(), [Validators.min(0), Validators.max(24)]),
    minutes: new FormControl((new Date()).getMinutes(), [Validators.min(0), Validators.max(60)])
  });

  @Output() selectDate = new EventEmitter<Date>();

  ngOnInit() {
    this.calcDays();
  }

  calcDays() {
    this.lastDay = new Date(
      this.date.getFullYear(),
      this.date.getMonth() + 1,
      0
    ).getDate();
    this.prevLastDay = new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      0
    ).getDate();
    this.firstDayIndex = this.date.getDay() === 0 ? 7 : this.date.getDay();
    this.lastDayIndex = new Date(
      this.date.getFullYear(),
      this.date.getMonth() + 1,
      0
    ).getDay();
    this.nextDays = 7 - this.lastDayIndex - 1;
    this.prevDays = [];
    this.lastDays = [];
    this.currentDaysHashTable = {};

    if (this.date.getFullYear() !== this.currentYear) {
      this.currentYear = this.date.getFullYear();
    }

    // get the previous days in current view of calendar
    for (let x = this.firstDayIndex; x > 1; x--) {
      this.prevDays.push(this.prevLastDay - x + 2); // + 2 because we are starting from monday, which is index 1
    }

    // create hash table of current days in a current month
    // so we can pair it with the data
    for (let i = 1; i <= this.lastDay; i++) {
      this.currentDaysHashTable[i] = {
        day: i,
        data: [],
        total: {
          hours: 0,
          minutes: 0,
        },
      };
    }

    //finally we are converting hash table into readable array
    this.currentDaysArray = Object.keys(this.currentDaysHashTable).map(
      (key) => this.currentDaysHashTable[key]
    );

    for (let j = 1; j <= this.nextDays; j++) {
      this.lastDays.push(j);
    }
  }

  close() {
    // emit output of removing data
    this.currentDaysArray[this.clickedDate.getDate() - 1].data = null;
    this.isSetHoursOpen = false;
  }

  timeToDecimal(t: string) {
    const arr = t.split(':');
    return parseInt(arr[0], 10) * 1 + parseInt(arr[1], 10) / 60;
  }

  prev() {
    this.date.setMonth(this.date.getMonth() - 1);
    this.calcDays();
  }

  next() {
    this.date.setMonth(this.date.getMonth() + 1);
    this.calcDays();
  }

  setMonth(monthIndex: number) {
    this.date.setMonth(monthIndex);
  }

  setYear(year: number) {
    this.date.setFullYear(year);
  }

  setDate(index: number) {
    this.clickedDate = new Date(this.date.getFullYear(), this.date.getMonth(), index + 1);
  }

  getYearRange(): number[] {
    const start = this.date.getFullYear() - 15;
    const stop = this.date.getFullYear() + 15;
    const finalArray = Array.from(
      { length: (stop - start) / 1 + 1 },
      (value, index) => start + index * 1
    );

    return finalArray;
  }

  increase(type: TimeEnum) {
    const newValue = this.timeForm.get(type).value + 1;
    this.timeForm.get(type).setValue(newValue)
  }

  decrease(type: TimeEnum) {
    const newValue = this.timeForm.get(type).value - 1;
    this.timeForm.get(type).setValue(newValue)
  }

  confirm() {
    this.clickedDate.setHours(this.timeForm.get('hours').value);
    this.clickedDate.setMinutes(this.timeForm.get('minutes').value);
    this.selectDate.emit(this.clickedDate);
  }
}
