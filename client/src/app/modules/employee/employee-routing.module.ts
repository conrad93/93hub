import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { CountryListComponent } from './components/country-list/country-list.component';
import { CountryFormComponent } from './components/country-form/country-form.component';
import { CityListComponent } from './components/city-list/city-list.component';
import { CityFormComponent } from './components/city-form/city-form.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { TemplateListComponent } from './components/template-list/template-list.component';
import { TemplateFormComponent } from './components/template-form/template-form.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'employee-list',
        component: EmployeeListComponent,
      },
      {
        path: 'employee-form',
        component: EmployeeFormComponent,
      },
      {
        path: 'customer-list',
        component: CustomerListComponent,
      },
      {
        path: 'customer-form',
        component: CustomerFormComponent,
      },
      {
        path: 'country-list',
        component: CountryListComponent,
      },
      {
        path: 'country-form',
        component: CountryFormComponent,
      },
      {
        path: 'city-list',
        component: CityListComponent,
      },
      {
        path: 'city-form',
        component: CityFormComponent,
      },
      {
        path: 'category-list',
        component: CategoryListComponent,
      },
      {
        path: 'category-form',
        component: CategoryFormComponent,
      },
      {
        path: 'template-list',
        component: TemplateListComponent,
      },
      {
        path: 'template-form',
        component: TemplateFormComponent,
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'dashboard'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
