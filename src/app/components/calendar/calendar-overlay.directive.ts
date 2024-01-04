import {
  ChangeDetectorRef,
  ComponentRef,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  OnDestroy,
  Output,
  ViewContainerRef,
} from '@angular/core';
import {
  Overlay,
  OverlayRef,
  PositionStrategy,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { DateTimePickerComponent } from './calendar.component';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[dateTimePicker]',
  standalone: true,
})
export class DateTimePickerDirective implements OnDestroy {
  @Output() selectDate = new EventEmitter<Date>();

  private overlayRef: OverlayRef | null = null;
  private showPickerTimeout: ReturnType<typeof setTimeout> = setTimeout(() => '');
  private subscriptions: Subscription[] = [];

  constructor(
    private element: ElementRef<HTMLElement>,
    private overlay: Overlay,
    private viewContainer: ViewContainerRef,
    private changeDetector: ChangeDetectorRef
  ) {}

  // We can add logic to some timeout on touch if needed
  @HostListener('click')
  show(): void {
    if (this.overlayRef?.hasAttached() === true) {
      return;
    }

    this.showPickerTimeout = setTimeout(() => {
      this.attachPicker();
    }, 500);
  }

  ngOnDestroy(): void {
    clearTimeout(this.showPickerTimeout);
    this.overlayRef?.dispose();
  }

  private attachPicker(): void {
    if (!this.overlayRef) {
      const positionStrategy = this.getPositionStrategy();
      this.overlayRef = this.overlay.create({positionStrategy});
    }

    const component = new ComponentPortal(
      DateTimePickerComponent,
      this.viewContainer,
      // injector
    );

    const componentRef: ComponentRef<DateTimePickerComponent> = this.overlayRef.attach(component);
    this.changeDetector.markForCheck();

    this.subscriptions.push(
      this.overlayRef.outsidePointerEvents().subscribe(() => {
        this.detachAndUnsubscribe()
      }),
    )

    this.subscriptions.push(componentRef.instance.selectDate.subscribe((data) => {
      this.detachAndUnsubscribe();
      this.selectDate.emit(data);
    }));
  }

  private detachAndUnsubscribe(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
    this.overlayRef?.detach();
  }

  /*
  This can be enhanced with pre-defined position
  1. Add new Input position with enum: TOP, LEFT, RIGHT, BOTTOM
  2. Then change getPositionStrategy accordingly
  */
  private getPositionStrategy(): PositionStrategy {
    return this.overlay
      .position()
      .flexibleConnectedTo(this.element)
      .withPositions([
        {
          originX: 'center',
          originY: 'center',
          overlayX: 'center',
          overlayY: 'top',
          panelClass: 'bottom',
        },
      ]);
  }
}
