import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { PopoverDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-table-delete-confirm',
  templateUrl: './table-delete-confirm.component.html',
  styleUrls: ['./table-delete-confirm.component.scss']
})
export class TableDeleteConfirmComponent implements OnInit {
  @Output() onConfirm: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(PopoverDirective) confirmPopover: PopoverDirective;

  constructor() { }

  ngOnInit() {
  }

  hideConfirm() {
    this.confirmPopover.hide();
  }

  showConfirm() {
    this.confirmPopover.show();
  }

  acceptConfirm() {
    this.hideConfirm();
    this.onConfirm.emit();
  }

}
