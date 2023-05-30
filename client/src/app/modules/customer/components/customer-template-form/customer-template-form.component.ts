import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Customer } from 'src/app/models/customer.model';
import { BaseService } from 'src/app/services/base.service';
import { CustomerService } from 'src/app/services/customer.service';
import { ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-customer-template-form',
  templateUrl: './customer-template-form.component.html',
  styleUrls: ['./customer-template-form.component.css']
})
export class CustomerTemplateFormComponent {

  apiUrl = environment.apiUrl;
  isInitializing: boolean = false;
  isLoading: boolean = false;
  id: string = '';
  customer: Customer | null = null;
  template: any = {};
  templateForm: any = {};
  data: any = {};
  warning: any = {};
  modal = {
    header: "",
    body: ""
  };
  dropDownData: any = {};
  showModal:boolean = false;

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
        this.fetchData();
      },
      error: e => {
        console.error(e);
        this.fetchData();
      },
      complete: () => console.info("complete"),
    });
  }

  fetchData(){
    const countryReq = this.baseService.post(
      "/api/base/get-data/country", 
      {filter: {status: 1}, fields: {name: 1, isd: 1}}, 
      {"c_token": this.customer?.token}
    );
    const cityReq = this.baseService.post(
      "/api/base/get-data/city", 
      {filter: {status: 1}, fields: {name: 1}}, 
      {"c_token": this.customer?.token}
    );
    const customerReq = this.baseService.post(
      "/api/base/get-data/customer", 
      {filter: {_id: this.customer?._id}, fields: {}}, 
      {"c_token": this.customer?.token}
    );
    forkJoin([countryReq, cityReq, customerReq]).subscribe({
      next: ([countryRes, cityRes, customerRes]:any) => {
        if(countryRes["status"]){
          this.dropDownData["countryData"] = countryRes["data"];
        }
        if(cityRes["status"]){
          this.dropDownData["cityData"] = cityRes["data"];
        }
        if(customerRes["status"]){
          this.data = customerRes["data"] && customerRes["data"].length ? customerRes["data"][0] : null;
        }
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
            this.patchData();
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

  patchData(){
    for (let i = 0; i < this.template["details"]["form"].length; i++) {
      const element = this.template["details"]["form"][i];
      if(element.type === 'object'){
        this.templateForm[element.name] = this.data[element.name] ? this.data[element.name] : {};
      } else if(element.type === 'array') {
        this.templateForm[element.name] = this.data[element.name] ? this.data[element.name] : [];
      } else {
        this.templateForm[element.name] = this.data[element.name] ? this.data[element.name] : '';
      }
    }
  }

  addRow(family: any, data: any){
    family = family ? family : [];
    if(data){
      let obj: any = {};
      data.forEach((element: any) => {
        if(element.type === 'array'){
          obj[element.name] = [];
        } else if(element.type === 'object') {
          obj[element.name] = {};
        } else {
          obj[element.name] = '';
        }
      });
      family.push(obj);
    }
  }

  removeRow(family: any, idx: number){
    family.splice(idx, 1);
  }

  removeFile(name: string){
    this.templateForm[name] = '';
  }

  onFileChange(event: any, name: string){
    if(event.target.files && event.target.files.length){
      let fd = new FormData();
      fd.append('name', name);
      fd.append('_file', event.target.files[0]);
      fd.append('folders', this.customer?.username ? this.customer?.username : '');
      this.baseService.postFormData('/api/file/upload',fd,{"c_token": this.customer?.token}).subscribe({
        next: (res: any) => {
          if(res["status"]){
            this.toastService.show({
              message:res["message"], 
              class:"border-green-800 text-green-800 dark:text-green-400", 
              timeout: 3000
            });
            this.templateForm[name] = this.apiUrl + "/api/file/show/" + this.customer?.username + "/" + res["name"];
          } else {
            this.toastService.show({
              message:res["message"], 
              class:"border-red-800 text-red-800 dark:text-red-400", 
              timeout: 3000
            });
          }
          event.target.value = '';
        },
        error: (err) => {
          if(err["error"] && !err["error"]["status"]){
            this.toastService.show({
              message: err["error"]["message"] ? err["error"]["message"] : "API failure.", 
              class:"border-red-800 text-red-800 dark:text-red-400", 
              timeout: 3000
            });
          }
          event.target.value = '';
          console.error(err);
        },
        complete: () => console.info('complete')
      });
    }
  }

  backToList(){
    this.router.navigate(["/customer/templates"], {relativeTo: this.route});
  }

  onSave(){
    this.isLoading = true;
    this.templateForm["template_id"] = this.template['_id'];
    this.baseService.post('/api/customer/update/' + this.customer?._id, this.templateForm, {"c_token": this.customer?.token}).subscribe({
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
        this.isLoading = false;
      },
      error: (err) => {
        if(err["error"] && !err["error"]["status"]){
          this.toastService.show({
            message: err["error"]["message"] ? err["error"]["message"] : "API failure.", 
            class:"border-red-800 text-red-800 dark:text-red-400", 
            timeout: 3000
          });
        }
        this.isLoading = false;
        console.error(err);
      },
      complete: () => console.info('complete')
    });
  }

  hideModal(){
    this.showModal = false;
    this.modal.header = '';
    this.modal.body = '';
  }
  openModal(){
    this.showModal = true;
    this.isLoading = true;
    this.modal.header = this.template["name"];
    this.baseService.postHeader("/api/template/preview/" + this.template["code"], this.templateForm, {"c_token": this.customer?.token}, {responseType: 'text'}).subscribe({
      next: (v: any) => {
        this.modal.body = v;
        this.isLoading = false;
      },
      error: e => {
        console.error(e);
        this.isLoading = false;
      },
      complete: () => console.info("complete"),
    });
  }

}
