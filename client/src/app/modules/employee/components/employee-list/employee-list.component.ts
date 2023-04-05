import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { EmployeeService } from '../../../../services/employee.service';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit{

  limit: number = 10;
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

  constructor(private baseService: BaseService, private employeeService: EmployeeService){
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
    let filter:any = {};
    this.search.name = "";
    Object.keys(this.search).forEach(key => {
      if(this.search[key]){
        filter[key] = this.search[key];
      }        
    });
    let req = {
      limit: this.limit,
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
        }
      },
      error: e => console.error(e),
      complete: () => console.info("complete"),
    });
  }

}
