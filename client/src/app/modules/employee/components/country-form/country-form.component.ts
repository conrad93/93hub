import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { BaseService } from 'src/app/services/base.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-country-form',
  templateUrl: './country-form.component.html',
  styleUrls: ['./country-form.component.css']
})
export class CountryFormComponent {

  apiUrl = environment.apiUrl;
  isLoading:boolean = false;
  isInitializing:boolean = false;
  employee: Employee | null = null;
  countryForm: FormGroup;
  id: string = '';
  file: any = {
    flag:{
      isSelected: false,
      value: ''
    }
  };

  constructor(private toastService: ToastService, private baseService: BaseService, private employeeService: EmployeeService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder){
    this.isInitializing = true;
    this.employeeService.signedInEmployee.subscribe({
      next: v => this.employee = v,
      error: e => console.error(e),
      complete: () => console.info("complete"),
    });
    this.countryForm = this.fb.group({
      name: ['', [
        Validators.required
      ]],
      code: ['', [
        Validators.required
      ]],
      status: ['', [
        Validators.required
      ]],
      isd: ['', [
        Validators.required
      ]],
      nationality: ['', [
        Validators.required
      ]],
      flag: ['', []],
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
        code: 1,
        status: 1,
        isd: 1,
        nationality: 1,
        flag: 1
      }
    };
    this.baseService.post('/api/base/get-by-id/country/' + this.id,req,{"e_token": this.employee?.token}).subscribe({
      next: (res:any) => {
        if(res['status'] && res['data']){
          this.countryForm.patchValue({
            code: res['data']['code'] ? res['data']['code'] : "",
            name: res['data']['name'] ? res['data']['name'] : "",
            status: res['data']['status'] || res['data']['status'] == 0 ? res['data']['status'] : "",
            isd: res['data']['isd'] ? res['data']['isd'] : "",
            nationality: res['data']['nationality'] ? res['data']['nationality'] : "",
            flag: res['data']['flag'] ? res['data']['flag'] : "",
          });
          if(this.countryForm.get('flag')?.value){
            this.file.flag.isSelected = true;
            this.file.flag.value = this.apiUrl + "/api/file/show" + this.countryForm.get('flag')?.value;
          }
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
    this.router.navigate(["/employee/country-list"], {relativeTo: this.route});
  }

  onSubmit(){
    this.isLoading = true;
    if(this.countryForm.valid){
      let fd = new FormData();
      fd.append('name', this.countryForm.get('name')?.value);
      fd.append('code', this.countryForm.get('code')?.value);
      fd.append('isd', this.countryForm.get('isd')?.value);
      fd.append('nationality', this.countryForm.get('nationality')?.value);
      fd.append('status', this.countryForm.get('status')?.value);
      fd.append('flag', this.countryForm.get('flag')?.value);
      fd.append('config', '{"path":"flags"}');
      if(this.id){
        fd.append('_id', this.id);
      }
      this.save(fd);
    } else {
      this.isLoading = false;
      this.toastService.show({
        message:"Invalid form.", 
        class:"border-green-800 text-green-800 dark:text-green-400", 
        timeout: 3000
      });
    }
  }

  save(data:any){
    this.baseService.postFormData('/api/file/form/country',data,{"e_token": this.employee?.token}).subscribe({
      next: (res: any) => {
        if(res["status"]){
          this.toastService.show({
            message:res["message"], 
            class:"border-green-800 text-green-800 dark:text-green-400", 
            timeout: 3000
          });
          if(!this.id) this.countryForm.reset(); 
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

  removeFile(name: string){
    this.countryForm.patchValue({
      [name]: ''
    });
    this.file[name].isSelected = false;
    this.file[name].value = '';
  }

  onFileChange(event: any, name: string){
    const reader = new FileReader();
    if(event.target.files && event.target.files.length){
      const tempFile = event.target.files[0];
      this.countryForm.patchValue({
        [name]: tempFile
      });
      reader.readAsDataURL(tempFile);
      reader.onload = () => {
        this.file[name].isSelected = true;
        this.file[name].value = reader.result;
      };
    }
  }

}
