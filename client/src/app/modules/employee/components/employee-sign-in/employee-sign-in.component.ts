import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/modules/employee/services/employee.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-employee-sign-in',
  templateUrl: './employee-sign-in.component.html',
  styleUrls: ['./employee-sign-in.component.css']
})
export class EmployeeSignInComponent implements OnInit {

  signInForm: FormGroup;
  isLoading: boolean = false;

  constructor(private employeeService: EmployeeService, private toastService: ToastService, private fb: FormBuilder, private router: Router) {
    this.signInForm = this.fb.group({
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

  ngOnInit(): void {
    
  }

  onSubmit(){
    this.isLoading = true;
    let data = this.signInForm.value;
    if(this.signInForm.valid){
      this.employeeService.signin(data).subscribe({
        next: (res: any) => {
          if(res["status"]){
            this.employeeService.setSignedInEmployee(res["data"]);
            this.toastService.show({
              message:res["message"], 
              class:"border-green-800 text-green-800 dark:text-green-400", 
              timeout: 3000
            });
            this.signInForm.reset();
            this.router.navigate(['/employee']);
          } else {
            this.toastService.show({
              message:res["message"], 
              class:"border-red-800 text-red-800 dark:text-red-400", 
              timeout: 3000
            });
          }
          console.log(res);
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
