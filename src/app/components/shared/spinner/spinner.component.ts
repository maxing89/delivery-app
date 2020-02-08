import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { PageScrollInstance, PageScrollService } from 'ng2-page-scroll';
import { spin_state } from './spinner.reducer';
import * as rootReducer from '../../../store/root.reducer';



@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
})
export class SpinnerComponent implements OnInit, OnDestroy {
  private spinnerState$: Observable<spin_state>;
  public busySubs: Subscription;
  public message: string;

  constructor(
    private store: Store<rootReducer.State>,
    @Inject(DOCUMENT) public document: any,
    private pageScrollService: PageScrollService
  ) {
    this.spinnerState$ = store.select(rootReducer.getSpin);
  }

  ngOnInit() {
    this.spinnerState$.subscribe((spinnerState) => {
      switch (spinnerState) {
        case spin_state.LOADING:
          this.message = '';
          this.busySubs = new Subscription();
          break;
        case spin_state.SAVING:
          this.scrollToTop();
          this.message = '';
          this.busySubs = new Subscription();
          break;
        case spin_state.NONE:
          if (this.busySubs) {
            this.busySubs.unsubscribe();
          }
          break;
        default:
          break;
      }
    });
  }

  ngOnDestroy() {
    if (this.busySubs) {
      this.busySubs.unsubscribe();
    }
  }

  scrollToTop() {
    const pageScrollInstance: PageScrollInstance = PageScrollInstance.newInstance({
      document: this.document,
      scrollTarget: '#topOfPage',
      pageScrollSpeed: 1500
    });
    this.pageScrollService.start(pageScrollInstance);
  }
}
