import { CommonModule, NgFor } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  InjectionToken,
  Output,
  TemplateRef,
} from '@angular/core';
import { months } from '../calendar.component';

export type ListData = string[] | TemplateRef<void>;
export const LIST_DATA = new InjectionToken<ListData>('');

@Component({
    selector: 'app-list',
    templateUrl: './list-overlay.component.html',
    styleUrls: ['./list-overlay.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, NgFor]
})
export class ListOverlayComponent implements AfterViewInit {
  months = months;
  @Output() selectMonth = new EventEmitter<{
    value: string | number;
    index: number;
  }>();

  constructor(@Inject(LIST_DATA) public listData: {list: string[], selectedIndex: number}) {}

  ngAfterViewInit() {
    if (this.listData.list.length > 0) {
      const element = document.getElementById(this.listData.selectedIndex.toString());
      element?.scrollIntoView();
    }
  }

  outputSelectedMonth(value: string | number, index: number) {
    this.selectMonth.emit({ value: value, index: index });
  }
}
