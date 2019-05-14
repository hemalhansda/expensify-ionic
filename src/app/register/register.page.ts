import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  mainImage = '/assets/icon/main-icon.png';
  errorMessage: string;
  users = [];
  errorCheck = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  register(form) {
    if (localStorage.getItem('users')) {
      this.users = JSON.parse(localStorage.getItem('users'));
      this.users.forEach(user => {
        if (user.username === form.value.username) {
          this.errorCheck = true;
          this.errorMessage = 'Username already exist';
        }
      });
    }
    if (this.errorCheck) { return; }
    this.errorMessage = '';
    this.users.push(form.value);
    localStorage.setItem('users', JSON.stringify(this.users));
    this.router.navigateByUrl('');
  }
}
