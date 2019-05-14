import { Component, OnInit } from '@angular/core';
import { CenterCoreService } from '../center-core.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  constructor(private core: CenterCoreService) {}

  changeTab(tab) {
    for (const property in this.core.activeTab) {
      if (property) {
        this.core.activeTab[property] = false;
      }
    }
    this.core.activeTab[tab] = true;
  }

  ngOnInit() {}
}
