import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateInputComponent } from './components/date-input/date-input.component';
import { AngularDateTimePickerComponent, AngularDateTimePickerDirective } from '../../projects/marekpanti/angular-date-time-picker/src/public-api';
// import { AngularDateTimePickerComponent, AngularDateTimePickerDirective } from '../../dist/marekpanti/angular-date-time-picker/public-api';
// import { AngularDateTimePickerComponent, AngularDateTimePickerDirective} from '@marekpanti/angular-date-time-picker';


@Component({
    selector: 'app-root',
    imports: [CommonModule, AngularDateTimePickerComponent, AngularDateTimePickerDirective, DateInputComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'date-time-picker';
  date = new Date();
  min = new Date();
}
