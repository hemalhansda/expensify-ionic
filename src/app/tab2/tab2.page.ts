import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  email: any;
  username: any;

  constructor(private router: Router, private rest: RestService) {
    if (localStorage.getItem('expensify-login')) {
      this.email = JSON.parse(localStorage.getItem('expensify-login')).user.email;
      this.username = JSON.parse(localStorage.getItem('expensify-login')).user.username;
    }
  }

  logout() {
    if (localStorage.getItem('expensify-login')) {
      this.rest.logout(JSON.parse(localStorage.getItem('token'))).subscribe((response) => {
        console.log(response);
        localStorage.removeItem('token');
        localStorage.removeItem('expensify-login');
        this.router.navigateByUrl('');
      });
    }
  }

  ngOnInit() {}
}
