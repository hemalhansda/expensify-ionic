import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.page.html',
  styleUrls: ['./deposit.page.scss'],
})
export class DepositPage implements OnInit {
  balance: any = 0;

  constructor() { }

  ngOnInit() {
    if (localStorage.getItem('bank')) {
      this.balance = JSON.parse(localStorage.getItem('bank'));
    }
  }

  deposit(form, amount) {
    this.balance += form.value.amount;
    localStorage.setItem('bank', JSON.stringify(this.balance));
    amount.value = '';
  }
}
