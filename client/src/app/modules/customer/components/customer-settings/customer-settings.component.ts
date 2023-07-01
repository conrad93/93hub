import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer } from 'src/app/models/customer.model';
import { BaseService } from 'src/app/services/base.service';
import { CustomerService } from 'src/app/services/customer.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-customer-settings',
  templateUrl: './customer-settings.component.html',
  styleUrls: ['./customer-settings.component.css']
})
export class CustomerSettingsComponent {
  isInitializing: boolean = true;
  profileForm: FormGroup;
  passwordForm: FormGroup;
  isLoading: boolean = false;
  customer: Customer | null = null;
  
  constructor(private baseService: BaseService, private toastService: ToastService, private fb: FormBuilder, private customerService: CustomerService){
    this.customerService.signedInCustomer.subscribe({
      next: v => this.customer = v,
      error: e => console.error(e),
      complete: () => console.info("complete"),
    });
    this.profileForm = this.fb.group({
      email: [this.customer?.email, [
        Validators.required,
        Validators.email
      ]],
      first_name: [this.customer?.first_name, [
        Validators.required,
      ]],
      last_name: [this.customer?.last_name, [
        Validators.required,
      ]],
    });
    this.passwordForm = this.fb.group({
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%#*?&])[A-Za-z\\d@$!%#*?&]{8,}$")
      ]],
      confirm_password: ['', [
        Validators.required,
        this.comparePassword.bind(this)
      ]]
    });
    this.isInitializing = false;
  }

  comparePassword(control: FormControl): {[s: string]: boolean} | null {
    if(this.passwordForm?.get('password')?.value !== control.value){
      return {'mismatch': true};
    }
    return null;
  }

  onProfileSubmit(){
    this.isLoading = true;
    let data = this.profileForm.value;
    if(this.profileForm.valid){
      this.baseService.post('/api/customer/update/' + this.customer?._id, data, {"c_token": this.customer?.token}).subscribe({
        next: (res: any) => {
          if(res["status"]){
            this.toastService.show({
              message:res["message"], 
              class:"border-green-800 text-green-800 dark:text-green-400", 
              timeout: 3000
            });
            this.setCustomer(data)
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

  onPasswordSubmit(){
    this.isLoading = true;
    if(this.passwordForm.valid){
      let data = this.passwordForm.value;
      data["id"] = this.customer?._id;
      this.baseService.post('/api/customer/update-password', data, {"c_token": this.customer?.token}).subscribe({
        next: (res: any) => {
          if(res["status"]){
            this.toastService.show({
              message:res["message"], 
              class:"border-green-800 text-green-800 dark:text-green-400", 
              timeout: 3000
            });
            this.passwordForm.reset();
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

  setCustomer(data: Customer){
    let req: Customer = {
      _id: this.customer?._id || '',
      token: this.customer?.token || '',
      username: this.customer?.username || '',
      first_name : data?.first_name ? data.first_name : this.customer?.first_name || '',
      last_name : data?.last_name ? data.last_name : this.customer?.last_name || '',
      email : data?.email ? data.email : this.customer?.email || '',
    };
    this.customerService.setSignedInCustomer(req);
  }
}
