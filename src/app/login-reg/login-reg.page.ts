import { Component, OnInit } from '@angular/core';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';

@Component({
  selector: 'app-login-reg',
  templateUrl: './login-reg.page.html',
  styleUrls: ['./login-reg.page.scss'],
})
export class LoginRegPage implements OnInit {
  mainImage = '/assets/icon/main-icon.png';
  constructor(private faio: FingerprintAIO) { }

  ngOnInit() {
  }

  login(form) {
    console.log('this is form: ', form);
  }

  getFingerprint() {
    this.faio.show({
      clientId: 'Fingerprint-Demo',
      clientSecret: 'password', //Only necessary for Android
      disableBackup: true,  //Only for Android(optional)
    })
    .then((result: any) => console.log(result))
    .catch((error: any) => console.log(error));
  }
}
