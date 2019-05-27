import { Component, OnInit } from '@angular/core';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { Router } from '@angular/router';
import { RestService } from '../rest.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-reg',
  templateUrl: './login-reg.page.html',
  styleUrls: ['./login-reg.page.scss'],
})
export class LoginRegPage implements OnInit {
  mainImage = '/assets/icon/main-icon.png';
  users: any;
  errorMessage: any;
  errCheck = true;
  username: any;

  constructor(private faio: FingerprintAIO, private router: Router, private rest: RestService,
              private http: HttpClient) {
    rest.getAllUsers().subscribe((response) => {
      this.users = response;
    });
  }

  ngOnInit() {}

  login(form) {
    this.users.forEach(user => {
      if (user.email === form.value.email) {
        this.username = user.username;
        this.errCheck = false;
      }
    });

    if (this.errCheck) {
      this.errorMessage = 'Incorrect Credentials';
    } else {
      this.errorMessage = '';
      this.rest.login(form.value).subscribe((response) => {
        const expensifyLogin = response;
        if (expensifyLogin) {
          this.rest.header = {
            headers: {
              'x-auth': expensifyLogin.token
            }
          };
          localStorage.setItem('token', JSON.stringify(expensifyLogin.token));
          localStorage.setItem('expensify-login', JSON.stringify(expensifyLogin));
          this.router.navigateByUrl('/home');
        }
      });
    }
  }

  getFingerprint() {
    this.faio.show({
      clientId: 'Fingerprint-Demo',
      clientSecret: 'password', // Only necessary for Android
      disableBackup: true,  // Only for Android(optional)
    })
    .then((result: any) => console.log(result))
    .catch((error: any) => console.log(error));
  }
}
