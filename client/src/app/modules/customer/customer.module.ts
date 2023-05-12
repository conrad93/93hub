import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomerHomeComponent } from './components/customer-home/customer-home.component';
import { CustomerHeaderComponent } from './components/customer-header/customer-header.component';
import { CustomerTemplateListComponent } from './components/customer-template-list/customer-template-list.component';
import { CustomerTemplateFormComponent } from './components/customer-template-form/customer-template-form.component';

@NgModule({
  declarations: [
    CustomerComponent,
    CustomerHomeComponent,
    CustomerHeaderComponent,
    CustomerTemplateListComponent,
    CustomerTemplateFormComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule
  ]
})
export class CustomerModule { }
