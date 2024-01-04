# Date Time Picker

I wrote this date-time-picker for my personal needs as I haven't seen a component that is simple and respects simplicity. Therefore I've created a component that is easy to use, easy to update design and most importantly a component that returns a simple date object that you can customize to your needs.


# Getting started

Manual Setup
First install through npm:

    npm install @marekpanti/angular-date-time-picker

Then import the calendar component if you need a static calendar picker, or you can add the directive as well:

    import { AngularDateTimePickerComponent } from  '@marekpanti/angular-date-time-picker';

# Custom input with date-time-picker with in-built directive:

    import { Component, Input } from  '@angular/core';
    import { CommonModule } from  '@angular/common';
    import { DateTimePickerDirective } from  '../calendar/calendar-overlay.directive';
    import { ControlValueAccessor } from  '@angular/forms';
    
    @Component({
    selector: 'app-date-input',
    standalone: true,
    imports: [CommonModule, DateTimePickerDirective],
    templateUrl: './date-input.component.html',
    styleUrls: ['./date-input.component.scss']
    })
    export  class  DateInputComponent  implements  ControlValueAccessor {
    @Input() date:  Date  =  new  Date();
    @Input() label:  string  =  '';
    
    touched  =  false
    disabled  =  false
    
    onChanged  = (date:  Date) => {}
    onTouched  = () => {}
    
    registerOnChange(fn:  any) {
    this.onChanged  =  fn
	    }
    
    registerOnTouched(fn:  any) {
    this.onTouched  =  fn
	    }
    
    writeValue(value:  Date):  void {
    this.date  =  new  Date(value)
	    }
    
    setDateValue(date:  Date) {
    this.writeValue(date)
    this.onChanged(date)
	    }
    
    markAsTouched() {
    if (!this.touched) {
    this.onTouched()
    this.touched  =  true
	    }
     }
    }

## Options

|months|You can pass input of the name of the months, so array of 12 strings|
|days| You can pass array of days in a week in the date picker|
