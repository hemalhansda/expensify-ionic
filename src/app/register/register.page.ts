import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  mainImage = '/assets/icon/main-icon.png';
  
  constructor() { }

  ngOnInit() {
  }

  register(form) {
    console.log(form);
  }

}
