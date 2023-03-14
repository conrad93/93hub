import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path:'', 
    component: HomeComponent
  },
  {
    path:'employee', 
    loadChildren: () => 
      import('./modules/employee/employee.module').then((m) => m.EmployeeModule)
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
