import { Component, OnInit } from '@angular/core';
import { initDropdowns } from 'flowbite';
import { EmployeeService } from 'src/app/modules/employee/services/employee.service';

@Component({
  selector: 'app-employee-header',
  templateUrl: './employee-header.component.html',
  styleUrls: ['./employee-header.component.css']
})
export class EmployeeHeaderComponent implements OnInit {

  constructor(private employeeService: EmployeeService){}

  ngOnInit(): void {
    initDropdowns();
  }

  signOut(){
    this.employeeService.signOut();
  }

}
