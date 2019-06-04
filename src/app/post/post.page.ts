import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController, NavController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';
import { PostModalPage } from '../post-modal/post-modal.page';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { RestService } from '../rest.service';
import * as moment from 'moment';
import * as watermark from 'watermarkjs';
import { WebView } from '@ionic-native/ionic-webview/ngx';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

  lastImage: string = null;
  loading: any;
  expensePosts: any;
  showLoader = false;
  originalImage: string;
  photos: any[];
  displayPhotos: any[];
  base64Image: any;
  sliceBase64Image: any;

  constructor(private actionSheet: ActionSheetController, private photoLib: PhotoLibrary,
              private modalController: ModalController, private camera: Camera, private rest: RestService,
              private platform: Platform, private loadingController: LoadingController,
              private webView: WebView) { }

  ngOnInit() {
    this.showLoader = true;
    this.photos = [];
    this.displayPhotos = [];
    this.rest.getAllPosts().subscribe(response => {
      this.expensePosts = response;
      this.showLoader = false;
    });
  }

  async presentModal(image?, targetPath?) {
    const modal = await this.modalController.create({
      component: PostModalPage,
      componentProps: { imageData: image ? image : 'no-image', imagePath: targetPath.length ? targetPath : 'no-path' }
    });
    return await modal.present();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheet.create({
      header: 'Add Post',
      buttons: [{
        text: 'From Camera',
        icon: 'aperture',
        handler: () => {
          console.log('Camera clicked');
          this.openCamera();
        }
      }, {
        text: 'From Gallery',
        icon: 'images',
        handler: () => {
          console.log('Gallery clicked');
          this.openGallery();
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  openCamera() {
    this.platform.ready().then(() => {
      const options: CameraOptions = {
        quality: 30,
        destinationType: this.camera.DestinationType.FILE_URI,
        saveToPhotoAlbum: true,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        targetHeight: 2272,
        targetWidth: 1704,
      };
      this.camera.getPicture(options).then(async (img) => {
        const self = this;
        const imageLoader = await this.loadingController.create({
          spinner: 'bubbles',
          message: 'Loading image..',
          // dismissOnPageChange: true,
          cssClass: 'customLoader',
        });
        imageLoader.present();
        // watermark([imageURL])
        // .dataUrl(watermark.text.lowerLeft('watermark.js', '48px serif', '#fff', 0.5))
        // .then((img) => {
        self.base64Image = img;
        self.displayPhotos.push(this.webView.convertFileSrc(self.base64Image)); // to show the thumbnails;
        self.sliceBase64Image = self.base64Image.slice(26);
        self.photos.push(self.sliceBase64Image);
        console.log('photos: ',  self.photos);
        this.presentModal(self.displayPhotos[0], self.photos);
        self.photos.reverse();
        imageLoader.dismiss();
        // }, (err) => {
        //   imageLoader.dismiss();
        //   // this.alertService.cameraFailure();
        // });
      }); // end of get Picture
    }); // end of platform ready function.
  }

  openGallery() {
    this.photoLib.requestAuthorization().then(() => {
      this.photoLib.getLibrary().subscribe({
        next: library => {
          library.forEach((libraryItem) => {
            console.log(libraryItem.id);          // ID of the photo
            console.log(libraryItem.photoURL);    // Cross-platform access to photo
            console.log(libraryItem.thumbnailURL); // Cross-platform access to thumbnail
            console.log(libraryItem.fileName);
            console.log(libraryItem.width);
            console.log(libraryItem.height);
            console.log(libraryItem.creationDate);
            console.log(libraryItem.latitude);
            console.log(libraryItem.longitude);
            console.log(libraryItem.albumIds);    // array of ids of appropriate AlbumItem, only of includeAlbumsData was used
          });
        },
        error: err => { console.log('could not get photos'); },
        complete: () => { console.log('done getting photos'); }
      });
    })
    .catch(err => console.log('permissions weren\'t granted'));
  }

}
