import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateTimePickerComponent } from './components/calendar/calendar.component';
import { DateTimePickerDirective } from './components/calendar/calendar-overlay.directive';
import { DateInputComponent } from './components/date-input/date-input.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DateTimePickerComponent, DateTimePickerDirective, DateInputComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'date-time-picker';
  date = new Date();
}
