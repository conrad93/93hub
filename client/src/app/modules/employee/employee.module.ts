import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeeHeaderComponent } from './components/employee-header/employee-header.component';
import { EmployeeSignInComponent } from './components/employee-sign-in/employee-sign-in.component';
import { EmployeeService } from 'src/app/modules/employee/services/employee.service';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent,
    EmployeeComponent,
    EmployeeHeaderComponent,
    EmployeeSignInComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    ReactiveFormsModule
  ]
})
export class EmployeeModule {
  constructor(private employeeService: EmployeeService) {
    this.employeeService.verify();
  }
}