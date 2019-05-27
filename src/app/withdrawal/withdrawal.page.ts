import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.page.html',
  styleUrls: ['./withdrawal.page.scss'],
})
export class WithdrawalPage implements OnInit {
  balance: any = 0;
  expenseHistory: any;

  constructor(private http: RestService) {}

  ngOnInit() {
    this.http.getExpenseHistory().subscribe((response) => {
      this.expenseHistory = response;
    });
    this.http.getBalance().subscribe((response) => {
      this.balance = response[0].balance;
    });
  }

  withdraw(form, amount) {
    const bankAccess = {
      username: JSON.parse(localStorage.getItem('expensify-login')).user.username,
      transactionType: 'Withdrawal',
      moneyAltered: form.value.amount,
      balanceBefore: this.balance,
      balanceAfter: this.balance - form.value.amount,
      createdAt: new Date()
    };
    this.http.addExpenseInfo(bankAccess).subscribe((response) => {
      console.log(response);
    });
    this.balance -= form.value.amount;
    this.http.setBalance({ balance: this.balance }).subscribe();
    amount.value = '';
  }
}
