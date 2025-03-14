import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ListOverlayDirective } from './list-overlay/list-overlay.directive';

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'Jun',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

interface TimeForm {
  hours: FormControl<number | null>;
  minutes: FormControl<number | null>;
}

enum TimeEnum {
  HOURS = 'hours',
  MINUTES = 'minutes',
}

@Component({
  selector: 'lib-angular-date-time-picker',
  standalone: true,
  imports: [CommonModule, ListOverlayDirective, ReactiveFormsModule],
  templateUrl: './angular-date-time-picker.component.html',
  styleUrls: ['./angular-date-time-picker.component.scss'],
})
export class AngularDateTimePickerComponent {
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
  clickedDate: Date | null = null;
  clickedToDate: Date | null = null;
  currentClickedIndex: number = 0;
  timeTypes = TimeEnum;
  timeForm = new FormGroup<TimeForm>({
    hours: new FormControl(new Date().getHours(), [
      Validators.min(0),
      Validators.max(24),
    ]),
    minutes: new FormControl(new Date().getMinutes(), [
      Validators.min(0),
      Validators.max(60),
    ]),
  });

  @Input() months = months;
  @Input() days = days;
  @Input() timePicker = false;
  @Input() range = false;
  @Input() min: Date;
  @Input() max: Date;
  @Output() selectDate = new EventEmitter<Date>();
  @Output() selectRange = new EventEmitter<Date[]>();

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
    if (this.clickedDate) {
      this.currentDaysArray[this.clickedDate.getDate() - 1].data = null;
      this.isSetHoursOpen = false;
    }
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
    // If the range selection is asked
    if (this.range) {
      // The order is very important -> Here if there already is existing range
      // and the user clicks on a new selection, we are starting from scratch
      if (this.clickedDate && this.clickedToDate) {
        this.clickedDate = null;
        this.clickedToDate = null;
      }

      // If there is already first selection, then we are assigning the value to clickedToDate
      if (this.clickedDate && !this.clickedToDate) {
        this.clickedToDate = new Date(
          this.date.getFullYear(),
          this.date.getMonth(),
          index
        );
      }

      // Only here we can set the first and most important starting point
      if (!this.clickedToDate && !this.clickedDate) {
        this.clickedDate = new Date(
          this.date.getFullYear(),
          this.date.getMonth(),
          index
        );
      }

      // In case the clickedToDate is lower, then we are reversing them
      if (
        this.clickedDate &&
        this.clickedToDate &&
        this.clickedDate > this.clickedToDate
      ) {
        const clickedToDate = this.clickedDate;
        const clickedDate = this.clickedToDate;
        this.clickedDate = clickedDate;
        this.clickedToDate = clickedToDate;
      }
      // In normal mode
    } else {
      this.clickedDate = new Date(
        this.date.getFullYear(),
        this.date.getMonth(),
        index
      );
    }
  }

  inRangeSelection(i: number) {
    const currentDay = new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      i
    );

    return (
      this.range &&
      this.clickedDate &&
      this.clickedToDate &&
      this.clickedDate.getDate() < currentDay.getDate() &&
      this.clickedToDate.getDate() > currentDay.getDate() &&
      this.clickedDate.getFullYear() >= currentDay.getFullYear() &&
      this.clickedToDate.getFullYear() >= currentDay.getFullYear() &&
      this.clickedDate.getMonth() >= currentDay.getMonth() &&
      this.clickedToDate.getMonth() >= currentDay.getMonth()
    );
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
    const newValue = (this.timeForm.get(type)?.value || 0) + 1;
    this.timeForm.get(type)?.setValue(newValue);
  }

  decrease(type: TimeEnum) {
    const newValue = (this.timeForm.get(type)?.value || 0) - 1;
    this.timeForm.get(type)?.setValue(newValue);
  }

  disableConfirmButton() {
    if (this.range) {
      return !this.clickedDate || !this.clickedToDate
    } else {
      return !this.clickedDate || !this.timeForm.valid
    }
  }

  confirm() {
    if (this.range) {
      if (this.clickedDate && this.clickedToDate) {
        this.selectRange.emit([this.clickedDate, this.clickedToDate]);
      }
    } else {
      if (this.clickedDate) {
        this.clickedDate.setHours(this.timeForm.get('hours')?.value || 0);
        this.clickedDate.setMinutes(this.timeForm.get('minutes')?.value || 0);
        this.selectDate.emit(this.clickedDate);
      }
    }
  }
}
