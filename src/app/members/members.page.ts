import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
})
export class MembersPage implements OnInit {
  users: any;

  constructor(private rest: RestService) {
    rest.getAllUsers().subscribe((response) => {
      this.users = response;
    });
  }

  ngOnInit() {
  }

}
