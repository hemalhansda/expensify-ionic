import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  // public url = 'http://localhost:3000';
  public url = 'https://expensify-api-v2.herokuapp.com';
  // public url = 'http://192.168.0.111:3000';

  public header: any;

  constructor(private http: HttpClient) {
    if (localStorage.getItem('token')) {
      this.header = {
        headers: {
          'x-auth': JSON.parse(localStorage.getItem('token'))
        }
      };
    }
  }

  public register(query) {
    return this.http.post(this.url + '/users', query);
  }

  public getAllUsers() {
    return this.http.get(this.url + '/users/getAllUsers');
  }

  public login(query) {
    return this.http.post(this.url + '/users/login', query);
  }

  public loginWithFingerprint(fingerId) {
    return this.http.post(this.url + '/users/login/fpCheck', fingerId);
  }

  public logout(token) {
    const options = this.header;
    options.params = token;
    return this.http.delete(this.url + '/users/me/token', options);
  }

  public getBalance() {
    return this.http.get(this.url + '/getBalance', this.header);
  }

  public setBalance(query) {
    return this.http.post(this.url + '/setBalance', query, this.header);
  }

  public getExpenseHistory() {
    return this.http.get(this.url + '/getAllExpenses', this.header);
  }

  public addExpenseInfo(query) {
    return this.http.post(this.url + '/addExpenseHistory', query, this.header);
  }

  public postExpense(query) {
    return this.http.post(this.url + '/postExpense', query, this.header);
  }
}
