import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  expenseHistory: any;
  showLoader = false;

  constructor(private rest: RestService) { }

  ngOnInit() {
    this.showLoader = true;
    this.rest.getExpenseHistory().subscribe((response) => {
      this.expenseHistory = response;
      this.expenseHistory = this.expenseHistory.map((eachHistory) => {
        eachHistory.createdAt = new Date(eachHistory.createdAt).toLocaleString();
        return eachHistory;
      });
      this.showLoader = false;
    });
  }

}
