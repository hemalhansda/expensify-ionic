import { Component, OnInit } from '@angular/core';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-reg',
  templateUrl: './login-reg.page.html',
  styleUrls: ['./login-reg.page.scss'],
})
export class LoginRegPage implements OnInit {
  mainImage = '/assets/icon/main-icon.png';
  users = [];
  errorMessage: any;
  errCheck = true;
  username: any;

  constructor(private faio: FingerprintAIO, private router: Router) {
    if (localStorage.getItem('users')) {
      this.users = JSON.parse(localStorage.getItem('users'));
    }
  }

  ngOnInit() {}

  login(form) {
    this.users.forEach(user => {
      if (user.email === form.value.email && user.password === form.value.password) {
        this.username = user.username;
        this.errCheck = false;
      }
    });

    if (this.errCheck) {
      this.errorMessage = 'Incorrect Credentials';
    } else {
      this.errorMessage = '';
      const token = {
        email: form.value.email,
        username: this.username,
        createdAt: new Date().toISOString()
      };
      localStorage.setItem('token', JSON.stringify(token));
      this.router.navigateByUrl('/home');
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
