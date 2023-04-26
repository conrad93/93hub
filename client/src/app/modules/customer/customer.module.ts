import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomerHomeComponent } from './components/customer-home/customer-home.component';


@NgModule({
  declarations: [
    CustomerComponent,
    CustomerHomeComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule
  ]
})
export class CustomerModule { }
