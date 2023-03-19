import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/modules/employee/services/employee.service';

@Component({
  selector: 'app-employee-sign-in',
  templateUrl: './employee-sign-in.component.html',
  styleUrls: ['./employee-sign-in.component.css']
})
export class EmployeeSignInComponent implements OnInit {

  signInForm: FormGroup;
  isLoading: boolean = false;

  constructor(private employeeService: EmployeeService, private fb: FormBuilder, private router: Router) {
    this.signInForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")
      ]],
    });
  }

  ngOnInit(): void {
    
  }

  onSubmit(){
    this.isLoading = true;
    let data = this.signInForm.value;
    this.employeeService.signin(data).subscribe({
      next: (res: any) => {
        if(res["status"]){
          this.employeeService.signedInEmployee.next(res["data"]);
          this.router.navigate(['/employee']);
        }
        console.log(res);
      },
      error: (err) => {
        if(err["error"] && !err["error"]["status"]){
          this.isLoading = false;
        }
        console.error(err);
      },
      complete: () => {
        this.isLoading = false;
        this.signInForm.reset();
        console.info('complete');
      } 
    });
  }

}
