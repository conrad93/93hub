import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { EmployeeGuard } from './guards/employee.guard';

const routes: Routes = [
  {
    path:'', 
    component: HomeComponent
  },
  {
    path:'sign-in', 
    component: SignInComponent
  },
  {
    path:'sign-up', 
    component: SignUpComponent
  },
  {
    path:'employee', 
    loadChildren: () => 
      import('./modules/employee/employee.module').then((m) => m.EmployeeModule),
    canActivate:[EmployeeGuard]
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path:'**', 
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
