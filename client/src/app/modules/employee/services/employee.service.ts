import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Employee } from '../../../models/employee.model';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoaderService } from '../../../services/loader.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  apiUrl = environment.apiUrl;
  signedInEmployee = new BehaviorSubject<Employee | null>(null);

  constructor(private http: HttpClient, private router: Router, private loaderService: LoaderService) { }

  signOut(){
    localStorage.removeItem('e_token');
    this.signedInEmployee.next(null);
    this.router.navigate(['/employee/sign-in']);
  }

  signin(data:any){
    let options = {
      "Content-Type": "application/json"
    };
    let headers = {headers: new HttpHeaders(options)};
    return this.http.post(this.apiUrl + '/api/employee/sign-in', data, headers);
  }

  setSignedInEmployee(data:Employee | null){
    this.signedInEmployee.next(data);
    if(data?.token){
      this.setTokenToLocalStorage(data.token);
    }
  }

  verify(){
    this.loaderService.show();
    let token = this.getTokenFromLocalStorage();
    if(token !== null){
      this.getEmployeeByToken(token)
      .subscribe({
        next: (res: any) => {
          if(res["status"]){
            this.signedInEmployee.next(res["data"]);
            this.router.navigate(['/employee']);
          }
        },
        error: (err) => {
          if(err["error"] && !err["error"]["status"]){
            this.loaderService.hide();
            this.signedInEmployee.next(null);
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
      this.signedInEmployee.next(null);
    }
  }

  getEmployeeByToken(token: string){
    let e_token = token;
    let options = {
      "e_token": e_token
    };
    let headers = {headers: new HttpHeaders(options)};
    return this.http.get(this.apiUrl + '/api/employee/verify', headers);
  }

  private getTokenFromLocalStorage() {
    let token = localStorage.getItem('e_token');
    return token;
  }

  private setTokenToLocalStorage(token: string){
    localStorage.setItem('e_token', token);
  }

}
