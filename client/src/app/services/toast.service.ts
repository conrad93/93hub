import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toasts: any[] = [];

  constructor() { }

  show(toast: any){
    this.toasts.push(toast);
    if(toast['timeout']){
      setTimeout(() => this.remove(this.toasts.length - 1), toast['timeout']);
    }
  }

  remove(i: number){
    this.toasts.splice(i,1);
  }

}
