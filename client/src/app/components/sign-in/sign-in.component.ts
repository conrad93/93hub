import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  
  isEmployee: boolean = false;
  employeeForm: FormGroup;
  isLoading: boolean = false;

  constructor(private employeeService: EmployeeService, private toastService: ToastService, private fb: FormBuilder, private router: Router){
    this.employeeForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%#*?&])[A-Za-z\\d@$!%#*?&]{8,}$")
      ]],
    });
  }

  onEmployeeSubmit(){
    this.isLoading = true;
    let data = this.employeeForm.value;
    if(this.employeeForm.valid){
      this.employeeService.signin(data).subscribe({
        next: (res: any) => {
          if(res["status"]){
            this.employeeService.setSignedInEmployee(res["data"]);
            this.toastService.show({
              message:res["message"], 
              class:"border-green-800 text-green-800 dark:text-green-400", 
              timeout: 3000
            });
            this.employeeForm.reset();
            this.router.navigate(['/employee']);
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
