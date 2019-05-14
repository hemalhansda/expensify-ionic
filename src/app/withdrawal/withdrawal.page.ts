import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.page.html',
  styleUrls: ['./withdrawal.page.scss'],
})
export class WithdrawalPage implements OnInit {
  balance: any;

  constructor() { }

  ngOnInit() {
    if (localStorage.getItem('bank')) {
      this.balance = JSON.parse(localStorage.getItem('bank'));
    }
  }

  withdraw(form, amount) {
    this.balance -= form.value.amount;
    localStorage.setItem('bank', JSON.stringify(this.balance));
    amount.value = '';
  }
}
