import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { BaseService } from 'src/app/services/base.service';
import { CustomerService } from 'src/app/services/customer.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-customer-template-form',
  templateUrl: './customer-template-form.component.html',
  styleUrls: ['./customer-template-form.component.css']
})
export class CustomerTemplateFormComponent {

  isInitializing: boolean = false;
  isLoading: boolean = false;
  id: string = '';
  customer: Customer | null = null;
  template: any = {};
  templateForm: any = {};
  data: Customer | null = null;
  warning: any = {};

  constructor(private toastService: ToastService, private baseService: BaseService, private router: Router, private route: ActivatedRoute, private customerService: CustomerService) {
    this.isInitializing = true;
    this.customerService.signedInCustomer.subscribe({
      next: v => this.customer = v,
      error: e => console.error(e),
      complete: () => console.info("complete"),
    });
    this.route.params.subscribe({
      next: param => {
        this.id = param['id'];
        if(this.id) {
          this.getTemplate();
        } else {
          this.isInitializing = false;
        }
      },
      error: e => {
        console.error(e);
        if(this.id) {
          this.getTemplate();
        } else {
          this.isInitializing = false;
        }
      },
      complete: () => console.info("complete"),
    });
  }

  getTemplate(){
    let req = {
      fields: {
        name: 1,
        code: 1,
        details: 1,
      }
    };
    this.baseService.post('/api/base/get-by-id/template/' + this.id, req, {"c_token": this.customer?.token}).subscribe({
      next: (res:any) => {
        if(res['status'] && res['data']){
          this.template = res['data'];
          if(this.template["details"]){
            this.template["details"] = JSON.parse(this.template["details"]);
          }
          this.createFormGroup(this.template["details"]["form"], this.templateForm);
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

  createFormGroup(data: any, form: any){

  }

  backToList(){
    this.router.navigate(["/customer/templates"], {relativeTo: this.route});
  }

  onSubmit(){

  }

}
