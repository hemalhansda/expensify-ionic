import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.page.html',
  styleUrls: ['./withdrawal.page.scss'],
})
export class WithdrawalPage implements OnInit {
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

  withdraw(form, amount) {
    const bankAccess = {
      username: JSON.parse(localStorage.getItem('token')).username,
      transactionType: 'Withdrawal',
      moneyAltered: form.value.amount,
      balanceBefore: this.balance,
      balanceAfter: this.balance - form.value.amount,
      moment: new Date()
    };
    this.expenseHistory.push(bankAccess);
    localStorage.setItem('history', JSON.stringify(this.expenseHistory));
    this.balance -= form.value.amount;
    localStorage.setItem('bank', JSON.stringify(this.balance));
    amount.value = '';
  }
}
