import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as rootReducer from '../../../store/root.reducer';
import { User } from '../../../models/user';
import { SignOut } from '../../auth/login/login.actions';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public user: Observable<User>;
  public async: any;

  constructor(private store: Store<rootReducer.State>) { }

  ngOnInit() {
    this.user = this.store.select(rootReducer.getAuthenticatedUser);
  }

  public logout() {
    this.store.dispatch(new SignOut());
  }

}
