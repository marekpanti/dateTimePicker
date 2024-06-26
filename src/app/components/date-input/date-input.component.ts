import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { DateTimePickerDirective } from '../calendar/calendar-overlay.directive';
import { ControlValueAccessor } from '@angular/forms';
import { AngularDateTimePickerDirective } from '../../../../projects/marekpanti/angular-date-time-picker/src/public-api';

@Component({
  selector: 'app-date-input',
  standalone: true,
  imports: [CommonModule, AngularDateTimePickerDirective],
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss']
})
export class DateInputComponent implements ControlValueAccessor {
  @Input() date: Date = new Date();
  @Input() label: string = '';

  touched = false
  disabled = false

  /* eslint-disable */
  onChanged = (date: Date) => {}
  onTouched = () => {}

  registerOnChange(fn: any) {
    this.onChanged = fn
  }
  registerOnTouched(fn: any) {
    this.onTouched = fn
  }
  writeValue(value: Date): void {
    this.date = new Date(value)
  }

  setDateValue(date: Date) {
    this.writeValue(date)
    this.onChanged(date)
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched()
      this.touched = true
    }
  }
}
