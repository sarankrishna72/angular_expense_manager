import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnChanges {

  @Input() totalItems: any[] = [];
  @Output() pageEvent: EventEmitter<any> = new EventEmitter();
  itemsPerPage: any = 20;
  currentPage : any = 1;
  totalPages : number = 0;
  pageNumbers: any = [];
  pageNumberItems: number[] = []
  startItems: any = [];
  endItems: any = [];
  constructor() {

  }

  updateItemsToShow() {
    const start: any = ((this.currentPage - 1) * this.itemsPerPage);
    const end = parseInt(start) + parseInt(this.itemsPerPage);
    this.totalPages =  Math.ceil(this.totalItems.length / this.itemsPerPage);
    this.pageNumberItems =  Array.from({length: this.totalPages}, (_, i) => i + 1)
    this.updatePageNumbers();
    this.pageEvent.emit({start, end, totalPages: this.totalPages, totalItems:this.totalItems.length, currentPage: this.currentPage})
  }

  updatePageNumbers(): void {
    this.pageNumbers = [];
    let startPage = 1;
    let endPage = this.totalPages;
    let startPageItems = [startPage]
    let endPageItems = [endPage];
    if (this.currentPage >= 1 && this.totalPages != 1) {
      startPageItems.push(startPage + 1);
      if (!startPageItems.includes(endPage - 1)) {
        endPageItems.unshift(endPage - 1)
      }
    }
    this.startItems = startPageItems;
    this.endItems = (startPageItems.toString() != endPageItems.toString()) && this.totalPages > 2 ?  endPageItems : [];
  }

  checkShowCurrentPageItem() {
    return (!this.endItems.includes(parseInt(this.currentPage)) && !this.startItems.includes(parseInt(this.currentPage)))
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes && changes['totalItems']) {
      this.updateItemsToShow();
    }
  }
}
