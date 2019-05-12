import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-reg',
  templateUrl: './login-reg.page.html',
  styleUrls: ['./login-reg.page.scss'],
})
export class LoginRegPage implements OnInit {
  mainImage = '/assets/icon/main-icon.png';
  constructor() { }

  ngOnInit() {
  }

  login(form) {
    console.log('this is form: ', form);
  }
}
