import { Component } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-header',
  templateUrl: './customer-header.component.html',
  styleUrls: ['./customer-header.component.css']
})
export class CustomerHeaderComponent {

  customer: Customer | null = null;

  constructor(private customerService: CustomerService){
    this.customerService.signedInCustomer.subscribe({
      next: v => this.customer = v,
      error: e => console.error(e),
      complete: () => console.info("complete"),
    });
  }

  ngOnInit(): void {
  }

  signOut(){
    this.customerService.signOut();
  }

}
