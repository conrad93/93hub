import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeeHeaderComponent } from './components/employee-header/employee-header.component';
import { EmployeeService } from 'src/app/services/employee.service';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';


@NgModule({
  declarations: [
    DashboardComponent,
    EmployeeComponent,
    EmployeeHeaderComponent,
    EmployeeListComponent,
    EmployeeFormComponent,
    CustomerFormComponent,
    CustomerListComponent
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