import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
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
        this.comparePassword.bind(this)
      ]],
      first_name: ['', [
        Validators.required,
      ]],
      last_name: ['', [
        Validators.required,
      ]],
    });
  }

  comparePassword(control: FormControl): {[s: string]: boolean} | null {
    if(this.customerForm?.get('password')?.value !== control.value){
      return {'mismatch': true};
    }
    return null;
  }

  onCustomerSubmit(){
    this.isLoading = true;
    let data = this.customerForm.value;
    if(this.customerForm.valid){
      this.baseService.post('/api/customer/sign-up', data, {}).subscribe({
        next: (res: any) => {
          if(res["status"]){
            this.toastService.show({
              message:res["message"], 
              class:"border-green-800 text-green-800 dark:text-green-400", 
              timeout: 3000
            });
            this.customerForm.reset();
            this.router.navigate(['/sign-in']);
          } else {
            this.toastService.show({
              message:res["message"], 
              class:"border-red-800 text-red-800 dark:text-red-400", 
              timeout: 3000
            });
          }
        },
        error: (err) => {
          if(err["error"] && !err["error"]["status"]){
            this.isLoading = false;
            this.toastService.show({
              message: err["error"]["message"] ? err["error"]["message"] : "API failure.", 
              class:"border-red-800 text-red-800 dark:text-red-400", 
              timeout: 3000
            });
          }
          console.error(err);
        },
        complete: () => {
          this.isLoading = false;
          console.info('complete');
        } 
      });
    } else {
      this.isLoading = false;
      this.toastService.show({
        message:"Invalid form.", 
        class:"border-green-800 text-green-800 dark:text-green-400", 
        timeout: 3000
      });
    }
  }

}
