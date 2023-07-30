import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateTimePickerDirective } from '../calendar/calendar-overlay.directive';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-date-input',
  standalone: true,
  imports: [CommonModule, DateTimePickerDirective],
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss']
})
export class DateInputComponent implements ControlValueAccessor {
  @Input() date: Date = new Date();

  onChanged: Function = () => {};
  onTouched: Function = () => {};

  registerOnChange(fn: Function) {
    this.onChanged = fn;
  }
  registerOnTouched(fn: Function) {
    this.onTouched = fn;
  }
  writeValue(value: Date): void {
    this.date = value;
  }

  setDateValue(date) {
    this.date = date;
  }
}
