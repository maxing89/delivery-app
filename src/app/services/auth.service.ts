import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { User, MockUser } from '../models/user';

export const MOCK_USER = new MockUser();
MOCK_USER._id = '1';
MOCK_USER.username = 'test';
MOCK_USER.firstName = 'Foo';
MOCK_USER.lastName = 'Bar';
MOCK_USER.password = '123';

export const RESPONSE_USER = new User();
RESPONSE_USER._fullName = 'Maxi Navas';


@Injectable()
export class AuthService {

  constructor (private http: Http) {}

  public authenticate(username: string, password: string): Observable<User> {
    if (username === MOCK_USER.username && password === MOCK_USER.password) {
      return Observable.of(RESPONSE_USER);
    }
    return Observable.throw(new Error('Usuario y/o Contraseña inválido'));
  }

  public signout(): Observable<boolean> {
    return Observable.of(true);
  }

  private handleLoginError(error: Response | any) {
    return Observable.throw(new Error('Login failed. Please try again'));
  }

}
