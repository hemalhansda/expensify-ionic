import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  expenseHistory = [];

  constructor() { }

  ngOnInit() {
    if (localStorage.getItem('history')) {
      this.expenseHistory = JSON.parse(localStorage.getItem('history')).map(transaction => {
        transaction.moment = new Date(transaction.moment).toLocaleString();
        return transaction;
      });
    }
  }

}
