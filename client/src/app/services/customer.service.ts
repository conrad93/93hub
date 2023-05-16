import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer.model';
import { LoaderService } from './loader.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl = environment.apiUrl;
  signedInCustomer = new BehaviorSubject<Customer | null>(null);

  constructor(private location: Location, private http: HttpClient, private router: Router, private loaderService: LoaderService) { }

  signOut(){
    localStorage.removeItem('c_token');
    this.signedInCustomer.next(null);
    this.router.navigate(['/sign-in']);
  }

  signin(data:any){
    let options = {
      "Content-Type": "application/json"
    };
    let headers = {headers: new HttpHeaders(options)};
    return this.http.post(this.apiUrl + '/api/customer/sign-in', data, headers);
  }

  setSignedInCustomer(data:Customer | null){
    this.signedInCustomer.next(data);
    if(data?.token){
      this.setTokenToLocalStorage(data.token);
    }
  }

  verify(){
    this.loaderService.show();
    let token = this.getTokenFromLocalStorage();
    if(token !== null){
      this.getCustomerByToken(token)
      .subscribe({
        next: (res: any) => {
          let currentURL = this.location.path();
          if(res["status"]){
            this.signedInCustomer.next(res["data"]);
            if(!currentURL.includes("customer")){
              this.router.navigate(['/customer']);
            }
          }
        },
        error: (err) => {
          if(err["error"] && !err["error"]["status"]){
            this.loaderService.hide();
            this.signedInCustomer.next(null);
          }
          console.error(err);
        },
        complete: () => {
          this.loaderService.hide();
          console.info('complete');
        } 
      });
    } else {
      this.loaderService.hide();
      this.signedInCustomer.next(null);
    }
  }

  getCustomerByToken(token: string){
    let c_token = token;
    let options = {
      "c_token": c_token
    };
    let headers = {headers: new HttpHeaders(options)};
    return this.http.get(this.apiUrl + '/api/customer/verify', headers);
  }

  private getTokenFromLocalStorage() {
    let token = localStorage.getItem('c_token');
    return token;
  }

  private setTokenToLocalStorage(token: string){
    localStorage.setItem('c_token', token);
  }

}
