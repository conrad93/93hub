import { Component } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent {
  toasts: any[] = [];

  constructor(private toastService: ToastService) { 
    this.toasts = this.toastService.toasts;
  }

  remove(i:number){
    this.toastService.remove(i);
  }

}
