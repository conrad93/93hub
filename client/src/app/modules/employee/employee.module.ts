import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeeHeaderComponent } from './components/employee-header/employee-header.component';
import { EmployeeService } from 'src/app/services/employee.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CountryListComponent } from './components/country-list/country-list.component';
import { CountryFormComponent } from './components/country-form/country-form.component';
import { CityFormComponent } from './components/city-form/city-form.component';
import { CityListComponent } from './components/city-list/city-list.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { TemplateFormComponent } from './components/template-form/template-form.component';
import { TemplateListComponent } from './components/template-list/template-list.component';


@NgModule({
  declarations: [
    DashboardComponent,
    EmployeeComponent,
    EmployeeHeaderComponent,
    EmployeeListComponent,
    EmployeeFormComponent,
    CustomerFormComponent,
    CustomerListComponent,
    CountryListComponent,
    CountryFormComponent,
    CityFormComponent,
    CityListComponent,
    CategoryListComponent,
    CategoryFormComponent,
    TemplateFormComponent,
    TemplateListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EmployeeRoutingModule
  ]
})
export class EmployeeModule {
  constructor(private employeeService: EmployeeService) {
    this.employeeService.verify();
  }
}