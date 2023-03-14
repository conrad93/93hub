import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeeHeaderComponent } from './components/employee-header/employee-header.component';
import { EmployeeSignInComponent } from './components/employee-sign-in/employee-sign-in.component';
import { EmployeeSignUpComponent } from './components/employee-sign-up/employee-sign-up.component';


@NgModule({
  declarations: [
    DashboardComponent,
    EmployeeComponent,
    EmployeeHeaderComponent,
    EmployeeSignInComponent,
    EmployeeSignUpComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule
  ]
})
export class EmployeeModule { }
