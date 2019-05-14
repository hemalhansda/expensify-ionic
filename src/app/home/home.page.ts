import { Component, OnInit } from '@angular/core';
import { CenterCoreService } from '../center-core.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(public core: CenterCoreService) {
  }

  ngOnInit() {
  }

}
