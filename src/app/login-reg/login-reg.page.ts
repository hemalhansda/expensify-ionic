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

  constructor(private faio: FingerprintAIO, private router: Router, private rest: RestService) {}

  ngOnInit() {}

  login(form) {
    this.errorMessage = '';
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
        this.router.navigateByUrl('/home');
      }
    }, (err) => {
      if (err) {
        this.errorMessage = 'Incorrect Credentials';
      }
    });
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
