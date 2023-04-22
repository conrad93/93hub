import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { BaseService } from 'src/app/services/base.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-city-form',
  templateUrl: './city-form.component.html',
  styleUrls: ['./city-form.component.css']
})
export class CityFormComponent {

  isLoading:boolean = false;
  isInitializing:boolean = false;
  employee: Employee | null = null;
  cityForm: FormGroup;
  id: string = '';
  countryData: any = [];

  constructor(private toastService: ToastService, private baseService: BaseService, private employeeService: EmployeeService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder){
    this.isInitializing = true;
    this.employeeService.signedInEmployee.subscribe({
      next: v => this.employee = v,
      error: e => console.error(e),
      complete: () => console.info("complete"),
    });
    this.cityForm = this.fb.group({
      name: ['', [
        Validators.required
      ]],
      code: ['', [
        Validators.required
      ]],
      countryCode: ['', [
        Validators.required
      ]],
      status: ['', [
        Validators.required
      ]]
    });
    this.route.queryParams.subscribe({
      next: param => {
        this.id = param['id'];
        this.getCountry();
      },
      error: e => {
        console.error(e);
        this.getCountry();
      },
      complete: () => console.info("complete"),
    });
  }

  getCountry(){
    let req = {
      filter: {
        status: 1
      },
      feilds: {
        name: 1,
        code: 1
      }
    };
    this.baseService.post("/api/base/get-data/country", req, {"e_token": this.employee?.token}).subscribe({
      next: (v: any) => {
        if(v["status"]){
          this.countryData = [...v["data"]];
        }
        if(this.id) {
          this.init();
        } else {
          this.isInitializing = false;
        }
      },
      error: e => {
        console.error(e);
        if(this.id) {
          this.init();
        } else {
          this.isInitializing = false;
        }
      },
      complete: () => console.info("complete"),
    });
  }

  init(){
    let req = {
      fields: {
        name: 1,
        code: 1,
        countryCode: 1,
        status: 1
      }
    };
    this.baseService.post('/api/base/get-by-id/city/' + this.id,req,{"e_token": this.employee?.token}).subscribe({
      next: (res:any) => {
        if(res['status'] && res['data']){
          this.cityForm.patchValue({
            name: res['data']['name'] ? res['data']['name'] : "",
            code: res['data']['code'] ? res['data']['code'] : "",
            countryCode: res['data']['countryCode'] ? res['data']['countryCode'] : "",
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
    this.router.navigate(["/employee/city-list"], {relativeTo: this.route});
  }

  onSubmit(){
    this.isLoading = true;
    if(this.cityForm.valid){
      if(this.id){
        let req = {
          _id: this.id,
          name: this.cityForm.get('name')?.value,
          code: this.cityForm.get('code')?.value,
          countryCode: this.cityForm.get('countryCode')?.value,
          status: this.cityForm.get('status')?.value
        };
        this.update(req);
      } else {
        let req = {
          name: this.cityForm.get('name')?.value,
          code: this.cityForm.get('code')?.value,
          countryCode: this.cityForm.get('countryCode')?.value,
          status: this.cityForm.get('status')?.value
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
    this.baseService.post('/api/base/create/city', data, {"e_token": this.employee?.token}).subscribe({
      next: (res: any) => {
        if(res["status"]){
          this.toastService.show({
            message:res["message"], 
            class:"border-green-800 text-green-800 dark:text-green-400", 
            timeout: 3000
          });
          this.cityForm.reset();
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
    this.baseService.post('/api/base/update/city', data, {"e_token": this.employee?.token}).subscribe({
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
