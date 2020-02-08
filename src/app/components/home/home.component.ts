import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

// @ngrx
import { Store } from '@ngrx/store';
import { go } from '@ngrx/router-store';

// reducers
import * as rootReducer from '../../store/root.reducer';

// actions
import * as homeActions from './home.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  subscription: Subscription = new Subscription();
  filterForm: FormGroup;
  loading$: Observable<boolean>;
  deliveries$: Observable<Array<any>>;
  deliveriesLength$: Observable<number>; // Number of deliveries
  pageSize = 5; // Total number of deliveries per page
  pagesToShow = 5; // Total number of page shown
  currentPage = 1;
  currentSortColumn: string;
  isDesc: boolean = null;
  allDeliveries$: Observable<Array<any>>;
  allDeliveries: Array<any>;

  ///////////* Table settings *///////////
  columns: any[] = [
    {
        display: 'Nombre', // Header name
        variable: 'nombre' // Content variable
    },
    {
        display: 'Dirección',
        variable: 'direccion'
    },
    {
        display: 'Teléfono',
        variable: 'telefono'
    }
  ];
  // Columns which allow sorting
  sorting: any = [
    {
      column: 'nombre', // Must be the same than columns.variable.
      descending: true // Allows descending and ascending sorting
    },
    {
      column: 'telefono',
      descending: false
    },
  ];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private store: Store<rootReducer.State>) { }

  ngOnInit() {
    this.store.dispatch(new homeActions.GetDeliveries(
      this.pageSize, this.currentPage, this.columns[0].variable, this.sorting[0].descending
    ));
    this.deliveries$ = this.store.select(rootReducer.getDeliveries);
    this.allDeliveries$ = this.store.select(rootReducer.getAllDeliveries);
    this.subscription.add(this.allDeliveries$.subscribe(allDeliveries => this.allDeliveries = allDeliveries));
    this.deliveriesLength$ = this.store.select(rootReducer.getDeliveriesLength);
    this.buildForm();
  }

  buildForm(): void {
    this.filterForm = this.formBuilder.group({
      'nombre': [null, []],
      'direccion': [null, []]
    });
    this.filterForm.controls['nombre'].valueChanges.subscribe(data => {
      this.filterDeliveries(data, 'nombre');
    });
    this.filterForm.controls['direccion'].valueChanges.subscribe(data => {
      this.filterDeliveries(data, 'direccion');
    });
  }

  getDeliveries(event) {
    this.currentSortColumn = event.currentSortColumn;
    this.isDesc = event.isDesc;
    this.store.dispatch(new homeActions.PaginateDeliveries(this.pageSize, event.page, event.currentSortColumn, event.isDesc));
  }

  filterDeliveries(filterText: string, property: string) {
    if (!this.currentSortColumn) { this.currentSortColumn =  this.columns[0].variable; }
    if (this.isDesc === null) { this.isDesc =  this.sorting[0].descending; }
    this.store.dispatch(new homeActions.FilterDeliveries(
      this.pageSize, this.currentPage, property,
      filterText, this.currentSortColumn, this.isDesc));
  }

  deleteDelivery(event) {
    this.store.dispatch(new homeActions.DeleteDelivery(
      event.recordID, this.pageSize, event.page,
      event.currentSortColumn, event.isDesc, this.allDeliveries
    ));
  }

  addDelivery() {
    this.router.navigate(['/delivery']);
  }

  editDelivery(deliveryID) {
    this.router.navigate(['/delivery', deliveryID]);
  }

}
