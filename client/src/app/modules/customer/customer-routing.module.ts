import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomerHomeComponent } from './components/customer-home/customer-home.component';
import { CustomerTemplateListComponent } from './components/customer-template-list/customer-template-list.component';
import { CustomerTemplateFormComponent } from './components/customer-template-form/customer-template-form.component';

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
        path: 'template/:id',
        component: CustomerTemplateFormComponent,
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
