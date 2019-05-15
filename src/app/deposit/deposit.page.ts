import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.page.html',
  styleUrls: ['./deposit.page.scss'],
})
export class DepositPage implements OnInit {
  balance: any = 0;
  expenseHistory = [];

  constructor() { }

  ngOnInit() {
    if (localStorage.getItem('history')) {
      this.expenseHistory = JSON.parse(localStorage.getItem('history'));
    }
    if (localStorage.getItem('bank')) {
      this.balance = JSON.parse(localStorage.getItem('bank'));
    }
  }

  deposit(form, amount) {
    const bankAccess = {
      username: JSON.parse(localStorage.getItem('token')).username,
      transactionType: 'Deposit',
      moneyAltered: form.value.amount,
      balanceBefore: this.balance,
      balanceAfter: this.balance + form.value.amount,
      moment: new Date()
    };
    this.expenseHistory.push(bankAccess);
    localStorage.setItem('history', JSON.stringify(this.expenseHistory));
    this.balance += form.value.amount;
    localStorage.setItem('bank', JSON.stringify(this.balance));
    amount.value = '';
  }
}
