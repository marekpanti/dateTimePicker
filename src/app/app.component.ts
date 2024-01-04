import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateTimePickerComponent } from './components/calendar/calendar.component';
import { DateTimePickerDirective } from './components/calendar/calendar-overlay.directive';
import { DateInputComponent } from './components/date-input/date-input.component';
import { AngularDateTimePickerComponent } from '@marekpanti/angular-date-time-picker';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DateTimePickerComponent, DateTimePickerDirective, DateInputComponent, AngularDateTimePickerComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'date-time-picker';
  date = new Date();
}
