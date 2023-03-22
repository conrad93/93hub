import { Component, OnInit } from '@angular/core';
import { initDropdowns } from 'flowbite';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/modules/employee/services/employee.service';

@Component({
  selector: 'app-employee-header',
  templateUrl: './employee-header.component.html',
  styleUrls: ['./employee-header.component.css']
})
export class EmployeeHeaderComponent implements OnInit {

  employee: Employee | null = null;

  constructor(private employeeService: EmployeeService){
    this.employeeService.signedInEmployee.subscribe({
      next: v => this.employee = v,
      error: e => console.error(e),
      complete: () => console.info("complete"),
    });
  }

  ngOnInit(): void {
    initDropdowns();
  }

  signOut(){
    this.employeeService.signOut();
  }

}
