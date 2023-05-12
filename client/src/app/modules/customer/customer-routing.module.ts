import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomerHomeComponent } from './components/customer-home/customer-home.component';
import { CustomerTemplateListComponent } from './components/customer-template-list/customer-template-list.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    children: [
      {
        path: 'home',
        component: CustomerHomeComponent,
      },
      {
        path: 'templates',
        component: CustomerTemplateListComponent,
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'home'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
