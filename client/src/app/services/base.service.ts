import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  post(url:string,body:any,header:any){
    let options = {
      "Content-Type": "application/json",
      ...header
    };
    let headers = {headers: new HttpHeaders(options)};
    return this.http.post(this.apiUrl + url, body, headers);
  }

  get(url:string,header:any){
    let options = {
      ...header
    };
    let headers = {headers: new HttpHeaders(options)};
    return this.http.get(this.apiUrl + url, headers);
  }

}
