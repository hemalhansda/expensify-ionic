import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from '../rest.service';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth/ngx';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  mainImage = '/assets/icon/main-icon.png';
  errorMessage: string;
  users: any;
  errorCheck = false;
  showLoader = false;
  fingerprint: any;

  constructor(private router: Router, private rest: RestService, private faio: FingerprintAIO) { }

  ngOnInit() {
  }

  // Using Expensify API
  register(form) {
    this.showLoader = true;
    this.rest.getAllUsers().subscribe((response) => {
      this.users = response;
    });

    if (this.users) {
      this.users.forEach(user => {
        if (user.username === form.value.username) {
          this.errorCheck = true;
          this.errorMessage = 'Username already exist';
        }
      });
    }
    if (this.errorCheck) {
      this.showLoader = false;
      return;
    }
    this.errorMessage = '';
    this.getFingerprint(form.value);
    // this.rest.register(query).subscribe((response) => {
    //   console.log('Successfull: ', response);
    //   this.showLoader = false;
    //   this.router.navigateByUrl('');
    // });
  }

  getFingerprint(data) {
    this.faio.show({
      clientId: 'Fingerprint-Demo',
      clientSecret: 'password', // Only necessary for Android
      disableBackup: true,  // Only for Android(optional)
    })
    .then((result: any) => {
      console.log('this is result: ', result);
      if (result.withFingerprint) {
        this.fingerprint = result.withFingerprint;
        const query = data;
        query.fingerId = this.fingerprint;
        this.rest.register(query).subscribe((response) => {
          console.log('Successfull: ', response);
          this.showLoader = false;
          this.router.navigateByUrl('');
        });
      }
    })
    .catch((error: any) => {
      console.log('this is error', error);
      this.rest.register(data).subscribe((response) => {
        console.log('Successfull: ', response);
        this.showLoader = false;
        this.router.navigateByUrl('');
      });
    });
  }

  //New Module
  // getFingerprint(data) {
  //   this.faio.isAvailable()
  //   .then((result)=> {
  //     if (result.isAvailable){
  //       // it is available

  //       this.faio.encrypt({ clientId: 'expensify', username: 'myUsername', password: 'myPassword' })
  //         .then(result => {
  //           if (result.withFingerprint) {
  //             console.log('Successfully encrypted credentials.');
  //             console.log('Encrypted credentials: ' + result.token);
  //             this.fingerprint = result;
  //             const query = data;
  //             query.fingerId = this.fingerprint;
  //             this.rest.register(query).subscribe((response) => {
  //               console.log('Successfull: ', response);
  //               this.showLoader = false;
  //               this.router.navigateByUrl('');
  //             });
  //           } else if (result.withBackup) {
  //             console.log('Successfully authenticated with backup password!');
  //           } else {
  //             console.log('Didn\'t authenticate!');
  //           }
  //         })
  //         .catch(error => {
  //           if (error === this.faio.ERRORS.FINGERPRINT_CANCELLED) {
  //             console.log('Fingerprint authentication cancelled');
  //           } else {
  //             console.error(error);
  //           }
  //         });
  //       } else {
  //         // fingerprint auth isn't available
  //       }
  //     })
  //     .catch(error => console.error(error));
  // }
}
