import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() records: Array<any>;
  @Input() columns: Array<any>;
  @Input() sort: Array<any>; // Array of the columns which allow sorting
  @Input() page: number; // Current page
  @Input() pageSize: number; // Records per page
  @Input() pagesToShow: number; // How many pages between next/prev pagination
  @Input() recordsLength: number; // Total number of records
  @Output() getRecords = new EventEmitter<any>();
  @Output() deleteRecord = new EventEmitter<any>();
  @Output() editRecord = new EventEmitter<number>();
  currentSortColumn: string;
  isDesc: boolean;

  constructor() { }

  ngOnInit() {
    this.currentSortColumn = (this.sort) ? this.sort[0].column : '';
    this.isDesc = (this.sort) ? this.sort[0].descending : '';
  }

  showSortingIcon(columnName: string) {
    return (columnName === this.currentSortColumn) ? true : false;
  }

  allowClicking(columnName: string) {
    let isSortable: boolean;
    for (const sortColumn of this.sort) {
      if (sortColumn.column === columnName) {
        isSortable = true;
      }
    }
    return (isSortable) ? true : false;
  }

  changeSorting(columnName: string): void {
    this.isDesc = !this.isDesc ;
    this.currentSortColumn = columnName;
    this.getRecords.emit({page: this.page, currentSortColumn: this.currentSortColumn, isDesc: this.isDesc});
  }

  goToPage(n: number): void {
    this.page = n;
    this.getRecords.emit({page: this.page, currentSortColumn: this.currentSortColumn, isDesc: this.isDesc});
  }

  onNext(): void {
    this.page++;
    this.getRecords.emit({page: this.page, currentSortColumn: this.currentSortColumn, isDesc: this.isDesc});
  }

  onPrev(): void {
    this.page--;
    this.getRecords.emit({page: this.page, currentSortColumn: this.currentSortColumn, isDesc: this.isDesc});
  }

  removeRecord(recordID) {
    this.deleteRecord.emit({recordID: recordID, page: this.page, currentSortColumn: this.currentSortColumn, isDesc: this.isDesc});
  }

  modifyRecord(recordID: number) {
    this.editRecord.emit(recordID);
  }
}
