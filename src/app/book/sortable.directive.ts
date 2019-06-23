import { Directive, AfterViewInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { Sortable, SortableStopEvent } from '@shopify/draggable';

@Directive({
  selector: '[appSortable]'
})
export class SortableDirective implements AfterViewInit {

  @Input()
  data: any[];

  @Output()
  stop = new EventEmitter();

  sortable: Sortable;

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    this.sortable = new Sortable(this.el.nativeElement, {
      draggable: 'mat-list-item'
    });

    this.sortable.on('sortable:stop', (evt: SortableStopEvent) => this.handleStop(evt));
  }

  handleStop(evt: SortableStopEvent) {
    const { newIndex, oldIndex } = evt;
    const next = this.data;
    const moved = next.splice(oldIndex, 1);
    next.splice(newIndex, 0, moved[0]);

    this.stop.emit();
  }
}