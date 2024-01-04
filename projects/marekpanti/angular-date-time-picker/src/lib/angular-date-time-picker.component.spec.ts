import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularDateTimePickerComponent } from './angular-date-time-picker.component';

describe('AngularDateTimePickerComponent', () => {
  let component: AngularDateTimePickerComponent;
  let fixture: ComponentFixture<AngularDateTimePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularDateTimePickerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AngularDateTimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
