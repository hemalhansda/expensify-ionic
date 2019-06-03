import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
})
export class MembersPage implements OnInit {
  users: any;
  showLoader = false;

  constructor(private rest: RestService) {
    this.showLoader = true;
    rest.getAllUsers().subscribe((response) => {
      this.users = response;
      this.showLoader = false;
    });
  }

  ngOnInit() {
  }

}
