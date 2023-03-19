import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeGuard } from './guards/employee.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeeSignInComponent } from './components/employee-sign-in/employee-sign-in.component';
import { EmployeeComponent } from './components/employee/employee.component';

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
