import { Component, QueryList, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MonacoEditorComponent } from 'src/app/components/monaco-editor/monaco-editor.component';
import { Employee } from 'src/app/models/employee.model';
import { BaseService } from 'src/app/services/base.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent {

  @ViewChildren(MonacoEditorComponent) viewMonacoEditor!: QueryList<MonacoEditorComponent>;
  isLoading: boolean = false;
  isInitializing: boolean = false;
  employee: Employee | null = null;
  templateForm: FormGroup;
  id: string = '';
  categoryData: any = [];

  constructor(private toastService: ToastService, private baseService: BaseService, private employeeService: EmployeeService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder){
    this.isInitializing = true;
    this.employeeService.signedInEmployee.subscribe({
      next: v => this.employee = v,
      error: e => console.error(e),
      complete: () => console.info("complete"),
    });
    this.templateForm = this.fb.group({
      name: ['', [
        Validators.required
      ]],
      code: ['', [
        Validators.required
      ]],
      categoryCode: ['', [
        Validators.required
      ]],
      status: ['', [
        Validators.required
      ]],
      template: ['', [
        Validators.required
      ]],
      details: ['', [
        Validators.required
      ]]
    });
    this.route.queryParams.subscribe({
      next: param => {
        this.id = param['id'];
        this.getCategory();
      },
      error: e => {
        console.error(e);
        this.getCategory();
      },
      complete: () => console.info("complete"),
    });
  }

  getCategory(){
    let req = {
      filter: {
        status: 1
      },
      fields: {
        name: 1,
        code: 1
      }
    };
    this.baseService.post("/api/base/get-data/category", req, {"e_token": this.employee?.token}).subscribe({
      next: (v: any) => {
        if(v["status"]){
          this.categoryData = [...v["data"]];
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
        categoryCode: 1,
        template: 1,
        details: 1,
        status: 1
      }
    };
    this.baseService.post('/api/base/get-by-id/template/' + this.id,req,{"e_token": this.employee?.token}).subscribe({
      next: (res:any) => {
        if(res['status'] && res['data']){
          this.templateForm.patchValue({
            name: res['data']['name'] ? res['data']['name'] : "",
            code: res['data']['code'] ? res['data']['code'] : "",
            categoryCode: res['data']['categoryCode'] ? res['data']['categoryCode'] : "",
            template: res['data']['template'] ? res['data']['template'] : "",
            details: res['data']['details'] ? res['data']['details'] : "",
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
    this.router.navigate(["/employee/template-list"], {relativeTo: this.route});
  }

  onSubmit(){
    this.isLoading = true;
    if(this.templateForm.valid){
      if(this.id){
        let req = {
          _id: this.id,
          name: this.templateForm.get('name')?.value,
          code: this.templateForm.get('code')?.value,
          categoryCode: this.templateForm.get('categoryCode')?.value,
          template: this.templateForm.get('template')?.value,
          details: this.templateForm.get('details')?.value,
          status: this.templateForm.get('status')?.value
        };
        this.update(req);
      } else {
        let req = {
          name: this.templateForm.get('name')?.value,
          code: this.templateForm.get('code')?.value,
          categoryCode: this.templateForm.get('categoryCode')?.value,
          template: this.templateForm.get('template')?.value,
          details: this.templateForm.get('details')?.value,
          status: this.templateForm.get('status')?.value
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
    this.baseService.post('/api/base/create/template', data, {"e_token": this.employee?.token}).subscribe({
      next: (res: any) => {
        if(res["status"]){
          this.toastService.show({
            message:res["message"], 
            class:"border-green-800 text-green-800 dark:text-green-400", 
            timeout: 3000
          });
          this.templateForm.reset();
          this.clearEditor();
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
    this.baseService.post('/api/base/update/template', data, {"e_token": this.employee?.token}).subscribe({
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

  onCodeChange(event: string, name: string){
    this.templateForm.patchValue({
      [name]: event
    });
  }

  clearEditor(){
    this.viewMonacoEditor.forEach(element => {
      element.clearEditor();
    });
  }

}
