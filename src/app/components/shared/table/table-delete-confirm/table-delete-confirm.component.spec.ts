import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDeleteConfirmComponent } from './table-delete-confirm.component';

describe('TableDeleteConfirmComponent', () => {
  let component: TableDeleteConfirmComponent;
  let fixture: ComponentFixture<TableDeleteConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableDeleteConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDeleteConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
