import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BusyModule } from 'angular2-busy';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { HttpInterceptorModule } from 'ng-http-interceptor';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';

import { reducer } from './store/root.reducer';
import { routing } from './app.routing';

// Effects
import { SpinnerEffects } from './components/shared/spinner/spinner.effects';
import { LoginEffects } from './components/auth/login/login.effects';
import { HomeEffects } from './components/home/home.effects';
import { DeliveryEffects } from './components/delivery/delivery.effects';

// Guards
import { AuthenticatedUserGuard } from './guards/authenticated-user';

// Directives
import { AutofocusDirective } from './directives/autofocus.directive';

// Services
import { AuthService } from './services/auth.service';
import { DeliveriesService } from './services/deliveries.service';

// Pipes
import { OrderByPipe } from './pipes/orderBy';

// Components
import { AppComponent } from './app.component';
import { SpinnerComponent } from './components/shared/spinner/spinner.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/shared/menu/menu.component';
import { TableComponent } from './components/shared/table/table.component';
import { PaginationComponent } from './components/shared/table/pagination/pagination.component';
import { TableDeleteConfirmComponent } from './components/shared/table/table-delete-confirm/table-delete-confirm.component';
import { DeliveryComponent } from './components/delivery/delivery.component';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent,
    AutofocusDirective,
    TableComponent,
    OrderByPipe,
    PaginationComponent,
    TableDeleteConfirmComponent,
    DeliveryComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterStoreModule.connectRouter(),
    StoreModule.provideStore(reducer, {
      router: window.location.pathname + window.location.search
    }),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    routing,
    BrowserAnimationsModule,
    BusyModule,
    Ng2PageScrollModule.forRoot(),
    HttpInterceptorModule,
    BsDropdownModule.forRoot(),
    PopoverModule.forRoot(),
    ModalModule.forRoot(),
    TimepickerModule.forRoot(),
    EffectsModule.run(SpinnerEffects),
    EffectsModule.run(LoginEffects),
    EffectsModule.run(HomeEffects),
    EffectsModule.run(DeliveryEffects),
  ],
  providers: [
    AuthService,
    DeliveriesService,
    AuthenticatedUserGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
