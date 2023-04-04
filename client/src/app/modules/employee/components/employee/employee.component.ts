import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  isSignIn: boolean = false;

  constructor(private router: Router){
    this.router.events.subscribe({
      next: event => {
        if(event instanceof NavigationEnd){
          this.isSignIn = event.url.includes("sign-in");
        }
      },
      error: e => console.error(e),
      complete: () => console.info("complete"),
    });
  }
}
