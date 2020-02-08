import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as rootReducer from '../../store/root.reducer';
import { Delivery, DeliveryInitValue } from './delivery.models';
import { PageScrollConfig, PageScrollService, PageScrollInstance } from 'ng2-page-scroll';
import { DOCUMENT } from '@angular/platform-browser';
import * as $ from 'jquery';
import { emailValidator } from '../../validators/emailValidator';
import { Subscription } from 'rxjs/Subscription';

// actions
import * as deliveryActions from './delivery.actions';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();
  deliveryForm: FormGroup;
  delivery$: Observable<Delivery>;
  delivery: Delivery = DeliveryInitValue;
  deliveries$: Observable<Array<any>>;
  deliveries: Array<any>;
  submitted = false;
  deliveryID = null;

  formErrors = {
    'nombre': '',
    'telefono': '',
    'descripcion': '',
    'especialidades': '',
    'direccion': '',
    'horarioApertura': '',
    'horarioClausura': '',
    'nombreAdmin': '',
    'nombreComercial': '',
    'apellidoAdmin': '',
    'apellidoComercial': '',
    'telefonoAdmin': '',
    'telefonoComercial': '',
    'emailAdmin': '',
    'emailComercial': '',
  };

  validationMessages = {
    'nombre':
    {
      'required': 'El nombre es requerido.',
      'pattern': 'El nombre es requerido.',
      'maxlength': 'Hasta 50 caracteres puede escribir.'
    },
    'telefono':
    {
      'required': 'El teléfono es requerido.',
      'pattern': 'El teléfono es requerido.',
      'maxlength': 'Hasta 50 caracteres puede escribir.'
    },
    'descripcion':
    {
      'required': 'La descripción es requerida.',
      'pattern': 'La descripción es requerida.',
      'maxlength': 'Hasta 1000 caracteres puede escribir.'
    },
    'especialidades':
    {
      'maxlength': 'Hasta 500 caracteres puede escribir.'
    },
    'direccion':
    {
      'required': 'La dirección es requerida.',
      'pattern': 'La dirección es requerida.',
      'maxlength': 'Hasta 200 caracteres puede escribir.'
    },
    'horarioApertura':
    {
      'required': 'El horario de apertura es requerido.',
      'pattern': 'El horario de apertura es requerido.'
    },
    'horarioClausura':
    {
      'required': 'El horario de clausura es requerido.',
      'pattern': 'El horario de clausura es requerido.'
    },
    'nombreAdmin':
    {
      'required': 'El nombre es requerido.',
      'pattern': 'El nombre es requerido.',
      'maxlength': 'Hasta 200 caracteres puede escribir.'
    },
    'nombreComercial':
    {
      'required': 'El nombre es requerido.',
      'pattern': 'El nombre es requerido.',
      'maxlength': 'Hasta 200 caracteres puede escribir.'
    },
    'apellidoAdmin':
    {
      'required': 'El apellido es requerido.',
      'pattern': 'El apellido es requerido.',
      'maxlength': 'Hasta 200 caracteres puede escribir.'
    },
    'apellidoComercial':
    {
      'required': 'El apellido es requerido.',
      'pattern': 'El apellido es requerido.',
      'maxlength': 'Hasta 200 caracteres puede escribir.'
    },
    'telefonoAdmin':
    {
      'required': 'El teléfono es requerido.',
      'pattern': 'El teléfono es requerido.',
      'maxlength': 'Hasta 100 caracteres puede escribir.'
    },
    'telefonoComercial':
    {
      'required': 'El teléfono es requerido.',
      'pattern': 'El teléfono es requerido.',
      'maxlength': 'Hasta 100 caracteres puede escribir.'
    },
    'emailAdmin':
    {
      'required': 'El email es requerido.',
      'pattern': 'El email es requerido.',
      'maxlength': 'Hasta 100 caracteres puede escribir.',
      'invalidEmailAddress': 'Email inválido.'
    },
    'emailComercial':
    {
      'required': 'El email es requerido.',
      'pattern': 'El email es requerido.',
      'maxlength': 'Hasta 100 caracteres puede escribir.',
      'invalidEmailAddress': 'Email inválido.'
    },
  };

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private store: Store<rootReducer.State>,
              private router: Router,
              private pageScrollService: PageScrollService,
              @Inject(DOCUMENT) private document: any) { }

  ngOnInit() {
    this.scrollToTop();
    this.deliveryID = this.route.snapshot.paramMap.get('id');
    this.deliveries$ = this.store.select(rootReducer.getAllDeliveries);
    this.subscription.add(this.deliveries$.subscribe(deliveries => this.deliveries = deliveries));
    this.delivery$ = this.store.select(rootReducer.getDelivery);
    this.subscription.add(this.delivery$.subscribe(delivery => {
      this.delivery = delivery;
      this.buildOrPatch(this.delivery);
    }));
    if (!this.deliveryID) {
      this.buildForm();
    } else {
      this.store.dispatch(new deliveryActions.GetDelivery(Number(this.deliveryID), this.deliveries));
    }
  }

  ngOnDestroy() {
    this.store.dispatch(new deliveryActions.ResetDelivery());
    this.submitted = false;
    this.subscription.unsubscribe();
  }

  buildOrPatch(delivery) {
    if (delivery) {
      if (!this.deliveryForm) {
        this.buildForm();
      } else {
        const deliveryFiltered = {...delivery};
        Object.keys(deliveryFiltered).forEach(
          (key) => (deliveryFiltered[key] === null) && delete deliveryFiltered[key]
        );
        this.deliveryForm.patchValue(deliveryFiltered);
      }
    }
  }

  buildForm(): void {
    this.deliveryForm = this.formBuilder.group({
      'nombre': [this.delivery.nombre, [Validators.required, Validators.pattern('.*\\S.*'), Validators.maxLength(50)]],
      'telefono': [this.delivery.telefono, [Validators.required, Validators.pattern('.*\\S.*'), Validators.maxLength(50)]],
      'descripcion': [this.delivery.descripcion, [Validators.required, Validators.pattern('.*\\S.*'), Validators.maxLength(1000)]],
      'especialidades': [this.delivery.especialidades, [Validators.maxLength(500)]],
      'direccion': [this.delivery.direccion, [Validators.required, Validators.pattern('.*\\S.*'), Validators.maxLength(200)]],
      'horarioApertura': [this.delivery.horarioApertura, [Validators.required, Validators.pattern('.*\\S.*')]],
      'horarioClausura': [this.delivery.horarioClausura, [Validators.required, Validators.pattern('.*\\S.*')]],
      'nombreAdmin': [this.delivery.nombreAdmin, [Validators.required, Validators.pattern('.*\\S.*'), Validators.maxLength(200)]],
      'nombreComercial': [this.delivery.nombreComercial, [Validators.maxLength(200)]],
      'apellidoAdmin': [this.delivery.apellidoAdmin, [Validators.required, Validators.pattern('.*\\S.*'), Validators.maxLength(200)]],
      'apellidoComercial': [this.delivery.apellidoComercial, [Validators.maxLength(200)]],
      'telefonoAdmin': [this.delivery.telefonoAdmin, [Validators.required, Validators.pattern('.*\\S.*'), Validators.maxLength(100)]],
      'telefonoComercial': [this.delivery.telefonoComercial, [Validators.maxLength(100)]],
      'emailAdmin': [this.delivery.emailAdmin, [Validators.required, Validators.pattern('.*\\S.*'), Validators.maxLength(100), emailValidator]],
      'emailComercial': [this.delivery.emailComercial, [Validators.maxLength(100), emailValidator]],
    });
    this.deliveryForm.valueChanges.subscribe(data => this.checkValidations(data));
  }

  checkValidations(data?: any) {
    if (!this.deliveryForm) { return; }
    const form = this.deliveryForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && !control.valid && this.submitted) {
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

  submit() {
    this.submitted = true;
    this.scrollToTop();
    if (this.deliveryForm.valid) {
      if (!this.deliveryID) {
        this.store.dispatch(new deliveryActions.CreateDelivery(this.deliveryForm.value));
      } else {
        this.store.dispatch(new deliveryActions.EditDelivery(this.deliveryForm.value, this.deliveryID));
      }
    } else {
      this.scrollToFirstInvalid();
      this.checkValidations();
    }
  }

  cancel() {
    this.router.navigate(['/home']);
  }

  scrollToTop() {
    const pageScrollInstance: PageScrollInstance = PageScrollInstance.newInstance({
      document: this.document,
      scrollTarget: '#topOfPage',
      pageScrollSpeed: 1500
    });
    this.pageScrollService.start(pageScrollInstance);
  }

  scrollToFirstInvalid() {
    const formControls = this.deliveryForm.controls;
    let target;
    for (const i in formControls) {
      if (!formControls[i].valid) {
        target = formControls[i];
        break;
      }
    }
    if (target) {
      const el = $('.ng-invalid:not(form):first');
      $('html,body').animate({scrollTop: (el.offset().top - 20)}, 'slow', () => {
        el.focus();
      });
    }
  }

  sameThanAdministrativo(isChecked: boolean) {
    if (isChecked) {
      this.deliveryForm.get('nombreComercial').setValidators([Validators.required, Validators.pattern('.*\\S.*'), Validators.maxLength(200)]);
      this.deliveryForm.get('nombreComercial').updateValueAndValidity();
      this.deliveryForm.get('apellidoComercial').setValidators([Validators.required, Validators.pattern('.*\\S.*'), Validators.maxLength(200)]);
      this.deliveryForm.get('apellidoComercial').updateValueAndValidity();
      this.deliveryForm.get('telefonoComercial').setValidators([Validators.required, Validators.pattern('.*\\S.*'), Validators.maxLength(100)]);
      this.deliveryForm.get('telefonoComercial').updateValueAndValidity();
      this.deliveryForm.get('emailComercial').setValidators([Validators.required, Validators.pattern('.*\\S.*'), Validators.maxLength(100), emailValidator]);
      this.deliveryForm.get('emailComercial').updateValueAndValidity();
    } else {
      this.deliveryForm.get('nombreComercial').setValidators([Validators.maxLength(200)]);
      this.deliveryForm.get('nombreComercial').updateValueAndValidity();
      this.deliveryForm.get('apellidoComercial').setValidators([Validators.maxLength(200)]);
      this.deliveryForm.get('apellidoComercial').updateValueAndValidity();
      this.deliveryForm.get('telefonoComercial').setValidators([Validators.maxLength(100)]);
      this.deliveryForm.get('telefonoComercial').updateValueAndValidity();
      this.deliveryForm.get('emailComercial').setValidators([Validators.maxLength(100), emailValidator]);
      this.deliveryForm.get('emailComercial').updateValueAndValidity();
    }
  }

}
