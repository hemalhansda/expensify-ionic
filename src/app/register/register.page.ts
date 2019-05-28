import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  mainImage = '/assets/icon/main-icon.png';
  errorMessage: string;
  users: any;
  errorCheck = false;
  showLoader = false;

  constructor(private router: Router, private rest: RestService) { }

  ngOnInit() {
  }

  // Using Expensify API
  register(form) {
    this.showLoader = true;
    this.rest.getAllUsers().subscribe((response) => {
      this.users = response;
    });

    if (this.users) {
      this.users.forEach(user => {
        if (user.username === form.value.username) {
          this.errorCheck = true;
          this.errorMessage = 'Username already exist';
        }
      });
    }
    if (this.errorCheck) {
      this.showLoader = false;
      return;
    }
    this.errorMessage = '';
    this.rest.register(form.value).subscribe((response) => {
      console.log('Successfull: ', response);
      this.showLoader = false;
      this.router.navigateByUrl('');
    });
  }
}
