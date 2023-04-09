import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { BaseService } from 'src/app/services/base.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent {

  isLoading:boolean = false;
  isInitializing:boolean = false;
  employee: Employee | null = null;
  employeeForm: FormGroup;
  id: string = '';

  constructor(private toastService: ToastService, private baseService: BaseService, private employeeService: EmployeeService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder){
    this.isInitializing = true;
    this.employeeService.signedInEmployee.subscribe({
      next: v => this.employee = v,
      error: e => console.error(e),
      complete: () => console.info("complete"),
    });
    this.employeeForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      name: ['', [
        Validators.required
      ]],
      status: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.minLength(8),
        Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%#*?&])[A-Za-z\\d@$!%#*?&]{8,}$")
      ]]
    });
    this.route.queryParams.subscribe({
      next: param => {
        this.id = param['id'];
        if(this.id) {
          this.init()
        } else {
          this.isInitializing = false;
        }
      },
      error: e => {
        console.error(e);
        this.isInitializing = false;
      },
      complete: () => console.info("complete"),
    });
  }

  init(){
    let req = {
      fields: {
        name: 1,
        email: 1,
        status: 1
      }
    };
    this.baseService.post('/api/base/get-by-id/employee/' + this.id,req,{"e_token": this.employee?.token}).subscribe({
      next: (res:any) => {
        if(res['status'] && res['data']){
          this.employeeForm.patchValue({
            email: res['data']['email'] ? res['data']['email'] : "",
            name: res['data']['name'] ? res['data']['name'] : "",
            status: res['data']['status'] || res['data']['status'] == 0 ? res['data']['status'] : "",
          })
        }
        this.isInitializing = false;
      },
      error: e => {
        console.error(e);
        this.isInitializing = false;
      },
      complete: () => console.info("complete"),
    });
  }

  backToList(){
    this.router.navigate(["/employee/employee-list"], {relativeTo: this.route});
  }

  onSubmit(){
    this.isLoading = true;
    if(this.employeeForm.valid){
      if(this.id){
        let req = {
          _id: this.id,
          name: this.employeeForm.get('name')?.value,
          email: this.employeeForm.get('email')?.value,
          status: this.employeeForm.get('status')?.value
        };
        this.update(req);
      } else {
        let req = {
          name: this.employeeForm.get('name')?.value,
          email: this.employeeForm.get('email')?.value,
          status: this.employeeForm.get('status')?.value,
          password: this.employeeForm.get('password')?.value ? this.employeeForm.get('password')?.value : "Admin@123"
        };
        this.create(req);
      }
    } else {
      this.isLoading = false;
      this.toastService.show({
        message:"Invalid form.", 
        class:"border-green-800 text-green-800 dark:text-green-400", 
        timeout: 3000
      });
    }
  }

  create(data:any){
    this.employeeService.create(data,{"e_token": this.employee?.token}).subscribe({
      next: (res: any) => {
        if(res["status"]){
          this.toastService.show({
            message:res["message"], 
            class:"border-green-800 text-green-800 dark:text-green-400", 
            timeout: 3000
          });
          this.employeeForm.reset();
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
  }

  update(data:any){
    this.baseService.post('/api/base/update/employee',data,{"e_token": this.employee?.token}).subscribe({
      next: (res: any) => {
        if(res["status"]){
          this.toastService.show({
            message:res["message"], 
            class:"border-green-800 text-green-800 dark:text-green-400", 
            timeout: 3000
          });
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
  }

}
