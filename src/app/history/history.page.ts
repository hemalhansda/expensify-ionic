import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  expenseHistory: any;

  constructor(private rest: RestService) { }

  ngOnInit() {
    this.rest.getExpenseHistory().subscribe((response) => {
      this.expenseHistory = response;
    });
    if (this.expenseHistory) {
      this.expenseHistory = this.expenseHistory.map(transaction => {
        transaction.moment = new Date(transaction.moment).toLocaleString();
        return transaction;
      });
    }
  }

}
