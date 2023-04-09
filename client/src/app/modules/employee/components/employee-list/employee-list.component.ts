import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { EmployeeService } from '../../../../services/employee.service';
import { Employee } from 'src/app/models/employee.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit{

  isLoading:boolean = false;
  limit: string = "10";
  count: number = 0;
  page: number = 1;
  sort_by: string = "createdAt";
  sort_type: string = "DESC";
  search:any = {
    name: "",
    email: "",
    status: ""
  };
  feilds: object = {
    name: 1,
    email: 1,
    status: 1
  };
  employee: Employee | null = null;
  data: any = [];

  constructor(private baseService: BaseService, private employeeService: EmployeeService, private router: Router, private route: ActivatedRoute){
    this.employeeService.signedInEmployee.subscribe({
      next: v => this.employee = v,
      error: e => console.error(e),
      complete: () => console.info("complete"),
    });
  }

  ngOnInit(): void {
    this.applyFilter();
  }

  applyFilter(){
    this.isLoading = true;
    let filter:any = {};
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
      feilds: this.feilds
    };
    this.baseService.post("/api/base/list/employee",req,{"e_token": this.employee?.token}).subscribe({
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

  addNew(){
    this.router.navigate(["/employee/employee-form"], {relativeTo: this.route});
  }

  edit(id: string){
    this.router.navigate(["/employee/employee-form"], {
      relativeTo: this.route,
      queryParams: {id: id}
    });
  }

  reset(){
    this.search.name = "";
    this.search.email = "";
    this.search.status = "";
    this.applyFilter();
  }

}
