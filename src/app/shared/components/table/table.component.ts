import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { PaginationComponent } from '../pagination/pagination.component';
import { ButtonComponent } from '../forms/button/button.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    PaginationComponent,
    ButtonComponent
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnChanges{
  @Input() tableCols: any = [];
  @Input() tableRows: any = [];
  @Output() tableActionsEvent: EventEmitter<any> = new EventEmitter();
  tableRowData: any[] = [];
  pageEventData: any;

  pageEvent(event: any) {
    if (event) {
      this.pageEventData = event;
      this.tableRowData = this.tableRows.slice(event.start, event.end);
    }
  }

  onTableCta(action: string, data: any): void {
    this.tableActionsEvent.emit({action,  data});
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.pageEvent(this.pageEventData)
  }
}
