import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpInterceptorService, getHttpHeadersOrInit } from 'ng-http-interceptor';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import * as rootReducer from './store/root.reducer';
import * as loginActions from './components/auth/login/login.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public authorizationToken: string;
  public newToken;

  constructor(httpInterceptor: HttpInterceptorService, private store: Store<rootReducer.State>) {
    this.store.select(rootReducer.getAuthorizationToken).subscribe(
      (token) => this.authorizationToken = token
    );

    httpInterceptor.request().addInterceptor((data, method) => {
      const headers = getHttpHeadersOrInit(data, method);
      if (!headers.get('Content-Type')) {
        headers.set('Content-Type', 'application/json');
      }
      if (headers.get('Authorization-Token') !== '{"userName": "admin", "password": "admin"}') {
        headers.set('Authorization-Token', this.authorizationToken);
      }
      return data;
    });

    httpInterceptor.response().addInterceptor((responseParam, method) => {
      return responseParam.do(
        response => {
          if (response.headers.get('Authorization-Token') !== null) {
            this.store.dispatch(
              new loginActions.UpdateAuthorizationToken({authorizationToken: response.headers.get('Authorization-Token')})
            );
          }
        },
        error => {
          if (error.status === 401) {
            this.store.dispatch(new loginActions.UnauthorizedRedirect());
          }
        }
      );
    });
  }

}
