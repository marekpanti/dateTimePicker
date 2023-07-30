import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateTimePickerComponent } from './calendar.component';

describe('DateTimePickerComponent', () => {
  let component: DateTimePickerComponent;
  let fixture: ComponentFixture<DateTimePickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DateTimePickerComponent]
    });
    fixture = TestBed.createComponent(DateTimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
