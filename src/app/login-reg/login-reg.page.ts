import { Component, OnInit } from '@angular/core';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { Router } from '@angular/router';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-login-reg',
  templateUrl: './login-reg.page.html',
  styleUrls: ['./login-reg.page.scss'],
})
export class LoginRegPage implements OnInit {
  mainImage = '/assets/icon/main-icon.png';
  users: any;
  errorMessage: any;
  errCheck = false;
  username: any;
  email = '';
  password = '';
  showLoader = false;
  fingerprint: any;

  constructor(private faio: FingerprintAIO, private router: Router, private rest: RestService) {
    this.email = '';
    this.password = '';
  }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.getFingerprint();
    }
  }

  login(form) {
    this.errorMessage = '';
    this.showLoader = true;
    this.rest.login(form.value).subscribe((response) => {
      const expensifyLogin = response;
      if (expensifyLogin) {
        this.rest.header = {
          headers: {
            'x-auth': expensifyLogin['token']
          }
        };
        localStorage.setItem('token', JSON.stringify(expensifyLogin['token']));
        localStorage.setItem('expensify-login', JSON.stringify(expensifyLogin));
        this.showLoader = false;
        this.router.navigateByUrl('/home');
      }
    }, (err) => {
      if (err) {
        this.errorMessage = 'Incorrect Credentials';
        this.showLoader = false;
      }
    });
  }

  getFingerprint() {
    this.errorMessage = '';
    this.showLoader = true;
    this.faio.show({
      clientId: 'Fingerprint-Demo',
      clientSecret: 'password', // Only necessary for Android
      disableBackup: true,  // Only for Android(optional)
    })
    .then((result: any) => {
      console.log('this is result: ', result);
      // if (result.withFingerprint) {
      //   this.fingerprint = result.withFingerprint;
      //   const query = {
      //     fingerId: this.fingerprint
      //   };
      //   this.rest.loginWithFingerprint(query).subscribe((response) => {
      //     const expensifyLogin = response;
      //     if (expensifyLogin) {
      //       this.rest.header = {
      //         headers: {
      //           'x-auth': expensifyLogin['token']
      //         }
      //       };
      //       localStorage.setItem('token', JSON.stringify(expensifyLogin['token']));
      //       localStorage.setItem('expensify-login', JSON.stringify(expensifyLogin));
      //       this.showLoader = false;
      //       this.router.navigateByUrl('/home');
      //     }
      //   }, (err) => {
      //     if (err) {
      //       this.errorMessage = 'Incorrect Credentials';
      //       this.showLoader = false;
      //     }
      //   });
      // }
      this.router.navigateByUrl('/home');
      this.showLoader = false;
    })
    .catch((error: any) => {
      this.errorMessage = 'Incorrect Credentials';
      this.showLoader = false;
      console.log('this is error', error);
    });
  }
}
