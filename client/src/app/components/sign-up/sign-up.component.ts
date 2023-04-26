import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/services/base.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  customerForm: FormGroup;
  isLoading: boolean = false;
  countryData: any = [];
  cityData: any = [];

  constructor(private baseService: BaseService, private toastService: ToastService, private fb: FormBuilder, private router: Router){
    this.customerForm = this.fb.group({
      username: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%#*?&])[A-Za-z\\d@$!%#*?&]{8,}$")
      ]],
      confirm_password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%#*?&])[A-Za-z\\d@$!%#*?&]{8,}$")
      ]],
      first_name: ['', [
        Validators.required,
      ]],
      last_name: ['', [
        Validators.required,
      ]],
    });
  }

  onCustomerSubmit(){}

}
