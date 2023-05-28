import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { BaseService } from 'src/app/services/base.service';
import { CustomerService } from 'src/app/services/customer.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-customer-template-list',
  templateUrl: './customer-template-list.component.html',
  styleUrls: ['./customer-template-list.component.css']
})
export class CustomerTemplateListComponent implements OnInit {

  apiUrl = environment.apiUrl;
  isLoading:boolean = false;
  showModal:boolean = false;
  limit: string = "10";
  count: number = 0;
  page: number = 1;
  sort_by: string = "createdAt";
  sort_type: string = "DESC";
  search:any = {
    name: "",
    status: ""
  };
  fields: object = {
    name: 1,
    code: 1,
    categoryCode: 1,
    status: 1
  };
  customer: Customer | null = null;
  data: any = [];
  modal = {
    header: "",
    body: ""
  };

  constructor(private baseService: BaseService, private customerService: CustomerService, private router: Router, private route: ActivatedRoute, private renderer: Renderer2){
    this.customerService.signedInCustomer.subscribe({
      next: v => this.customer = v,
      error: e => console.error(e),
      complete: () => console.info("complete"),
    });
  }

  ngOnInit(): void {
    this.applyFilter();
  }

  applyFilter(){
    this.isLoading = true;
    let filter:any = {
      status: 1
    };
    Object.keys(this.search).forEach(key => {
      if(this.search[key]){
        filter[key] = this.search[key];
      }        
    });
    let req = {
      limit: parseInt(this.limit),
      page: this.page,
      sort_by: this.sort_by,
      sort_type: this.sort_type,
      filter: filter,
      fields: this.fields
    };
    this.baseService.post("/api/template/list",req,{"c_token": this.customer?.token}).subscribe({
      next: (v: any) => {
        if(v["status"]){
          this.data = [...v["data"]];
          this.count = v["count"] ? v["count"] : 0;
        }
        this.isLoading = false;
      },
      error: e => {
        console.error(e);
        this.isLoading = false;
      },
      complete: () => console.info("complete"),
    });
  }

  showStart(){
    return (parseInt(this.limit) * (this.page - 1)) + 1;
  }

  showEnd(){
    return parseInt(this.limit) > this.count ? this.count : ( (parseInt(this.limit) * this.page) > this.count ? this.count : (parseInt(this.limit) * this.page) );
  }

  isLastPage(){
    return Math.ceil(this.count / parseInt(this.limit)) <= this.page ? 'bg-gray-200 dark:bg-gray-700 custom-disabled' : 'cursor-pointer bg-white dark:bg-gray-800 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white';
  }

  movePrev(){
    this.page = this.page - 1;
    this.applyFilter();
  }

  moveNext(){
    this.page = this.page + 1;
    this.applyFilter();
  }

  toTheme(id:string){
    this.router.navigate(["/customer/template", id], {relativeTo: this.route});
  }

  hideModal(){
    this.showModal = false;
    this.modal.header = '';
    this.modal.body = '';
  }
  openModal(code: string, name: string){
    this.showModal = true;
    this.isLoading = true;
    this.modal.header = name;
    this.baseService.postHeader("/api/template/preview/" + code, {}, {"c_token": this.customer?.token}, {responseType: 'text'}).subscribe({
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
