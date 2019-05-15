import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  email: any;
  username: any;

  constructor(private router: Router) {
    if (localStorage.getItem('token')) {
      this.email = JSON.parse(localStorage.getItem('token')).email;
      this.username = JSON.parse(localStorage.getItem('token')).username;
    }
  }

  logout() {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
      this.router.navigateByUrl('');
    }
  }

  ngOnInit() {}
}
