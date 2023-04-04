import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeGuard } from './guards/employee.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeeSignInComponent } from './components/employee-sign-in/employee-sign-in.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate:[EmployeeGuard]
      },
      {
        path: 'sign-in',
        component: EmployeeSignInComponent
      },
      {
        path: 'employee-list',
        component: EmployeeListComponent,
        canActivate:[EmployeeGuard]
      },
      {
        path: 'employee-form',
        component: EmployeeFormComponent,
        canActivate:[EmployeeGuard]
      },
      {
        path: 'customer-list',
        component: CustomerListComponent,
        canActivate:[EmployeeGuard]
      },
      {
        path: 'customer-form',
        component: CustomerFormComponent,
        canActivate:[EmployeeGuard]
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
