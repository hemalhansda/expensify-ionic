import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.page.html',
  styleUrls: ['./deposit.page.scss'],
})
export class DepositPage implements OnInit {
  balance: any = 0;
  expenseHistory: any;
  errorMessage: any = '';

  constructor(private http: RestService) { }

  ngOnInit() {
    this.http.getExpenseHistory().subscribe((response) => {
      this.expenseHistory = response;
    });
    this.http.getBalance().subscribe((response) => {
      this.balance = response[0].balance;
    });
  }

  deposit(form, amount) {
    const bankAccess = {
      username: JSON.parse(localStorage.getItem('expensify-login')).user.username,
      transactionType: 'Deposit',
      moneyAltered: form.value.amount,
      balanceBefore: this.balance,
      balanceAfter: this.balance + form.value.amount,
      createdAt: new Date()
    };
    this.http.addExpenseInfo(bankAccess).subscribe((response) => {
      console.log(response);
    });
    this.balance += form.value.amount;
    this.http.setBalance({ balance: this.balance }).subscribe();
    amount.value = '';
  }
}
