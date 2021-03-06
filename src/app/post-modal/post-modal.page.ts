import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.page.html',
  styleUrls: ['./post-modal.page.scss'],
})
export class PostModalPage implements OnInit {
  errorMessage: any;

  @Input() value: number;
  imageData: any;
  userInfo: any;
  imagePath: any;

  constructor(private navParams: NavParams, private modalController: ModalController,
              private rest: RestService) { }

  ngOnInit() {
    this.imageData = this.navParams.get('imageData');
    this.imagePath = this.navParams.get('imagePath');
    console.log('imageData: ', this.imageData);
    console.log('imagePAth: ', this.imagePath);
    this.userInfo = JSON.parse(localStorage.getItem('expensify-login'));
  }

  closeModal() {
    this.modalController.dismiss();
  }

  post(form) {
    const query = form.value;
    query.image = this.imagePath;
    query.username = this.userInfo.user.username;
    query.email = this.userInfo.user.email;
    query.createdAt = new Date();
    this.rest.postExpense(query).subscribe((response) => {
      console.log('Success: ', response);
      this.modalController.dismiss();
    });
  }

}
