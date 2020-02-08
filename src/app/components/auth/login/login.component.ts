import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

// @ngrx
import { Store } from '@ngrx/store';
import { go } from '@ngrx/router-store';

// reducers
import {
  getAuthenticationError,
  isAuthenticated,
  isAuthenticationLoading,
  State
} from '../../../store/root.reducer';

// actions
import * as loginActions from './login.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  error$: Observable<string>;
  loading$: Observable<boolean>;

  public loginForm: FormGroup;
  submitted: boolean;

  formErrors = {
    'username': '',
    'password': ''
  };

  validationMessages = {
    'username': { 'required': 'El nombre de usuario es requerido.' , 'maxlength': 'Username cannot be more than 35 characters long.' },
    'password': { 'required': 'La contraseña es requerida.' , 'maxlength': 'Password cannot be more than 51 characters long.' },
  };

  constructor(private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private store: Store<State>) { }

  ngOnInit() {
    this.store.dispatch(new loginActions.ClearAuthError());
    this.submitted = false;
    this.buildForm();
    this.error$ = this.store.select(getAuthenticationError);
    this.loading$ = this.store.select(isAuthenticationLoading);
    this.loading$.subscribe(loading => {
      if (loading) {
        this.loginForm.get('username').disable();
        this.loginForm.get('password').disable();
      } else {
        this.loginForm.get('username').enable();
        this.loginForm.get('password').enable();
      }
    });
  }

  buildForm(): void {
    this.loginForm = this.formBuilder.group({
      'username': [null, [Validators.required, Validators.maxLength(35)]],
      'password': [null, [Validators.required, Validators.maxLength(51)]],
    });
    this.loginForm.valueChanges.subscribe(data => this.checkValidations(data));
  }

  checkValidations(data?: any) {
    if (!this.loginForm) { return; }
    const form = this.loginForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if ((control && !control.valid) && (control.dirty || this.submitted)) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onLogin() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.store.dispatch(new loginActions.Authentication(
        this.loginForm.controls['username'].value, this.loginForm.controls['password'].value)
      );
    } else {
      this.checkValidations();
    }
  }


}
