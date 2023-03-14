import { Component, OnInit } from '@angular/core';
import { initDropdowns } from 'flowbite';

@Component({
  selector: 'app-employee-header',
  templateUrl: './employee-header.component.html',
  styleUrls: ['./employee-header.component.css']
})
export class EmployeeHeaderComponent implements OnInit {

  constructor(){}

  ngOnInit(): void {
    initDropdowns();
  }

  signOut(){
    
  }

}
