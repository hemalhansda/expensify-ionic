import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.page.html',
  styleUrls: ['./post-modal.page.scss'],
})
export class PostModalPage implements OnInit, OnChanges {
  errorMessage: any;

  @Input() value: number;
  imageData: any;
  userInfo: any;
  imagePath: any;

  constructor(private navParams: NavParams, private modalController: ModalController,
              private rest: RestService) { }

  ngOnInit() {
    this.imageData = [];
    this.imagePath = [];
    this.imageData = this.navParams.get('imageData');
    this.imagePath = this.navParams.get('imagePath');
    this.userInfo = JSON.parse(localStorage.getItem('expensify-login'));
  }

  ngOnChanges() {
    this.imageData = [];
    this.imageData = this.navParams.get('imageData');
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
      this.modalController.dismiss();
    });
  }

}
