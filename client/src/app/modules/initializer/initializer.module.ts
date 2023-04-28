import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService } from 'src/app/services/customer.service';
import { take } from 'rxjs';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: (customerService: CustomerService) => {
        return () => {
          customerService.verify();
          return customerService.signedInCustomer.pipe(take(1));
        }
      },
      deps: [CustomerService]
    }
  ],
})
export class InitializerModule { }
