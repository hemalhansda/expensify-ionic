import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController, NavController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';
import { PostModalPage } from '../post-modal/post-modal.page';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { RestService } from '../rest.service';
// import * as moment from 'moment';
// import * as watermark from 'watermarkjs';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Base64 } from '@ionic-native/base64/ngx';

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
              private webView: WebView, private base64: Base64) { }

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
      componentProps: { imageData: image ? image : 'no-image', imagePath: targetPath ? targetPath : 'no-path' }
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
          this.openCamera(false);
        }
      }, {
        text: 'From Gallery',
        icon: 'images',
        handler: () => {
          // this.openGallery();
          this.openCamera(true);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  }

  openCamera(useAlbum: boolean) {
    this.platform.ready().then(() => {
      const options: CameraOptions = {
        quality: 30,
        destinationType: this.camera.DestinationType.FILE_URI,
        saveToPhotoAlbum: true,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: useAlbum ? this.camera.PictureSourceType.SAVEDPHOTOALBUM : undefined,
        targetHeight: 704,
        targetWidth: 904,
      };
      this.camera.getPicture(options).then(async (img) => {
        const self = this;
        const imageLoader = await this.loadingController.create({
          spinner: 'bubbles',
          message: 'Loading image..',
          cssClass: 'customLoader',
        });
        imageLoader.present();
        self.base64Image = img;
        self.displayPhotos.push(this.webView.convertFileSrc(self.base64Image)); // to show the thumbnails;
        self.sliceBase64Image = self.base64Image.slice(22);
        self.photos.push(self.sliceBase64Image);
        this.base64.encodeFile(img).then((base64File: string) => {
          const convertedImage = 'data:image/jpeg;base64,' + base64File;
          this.presentModal(self.displayPhotos[0], base64File);
        }, (err) => {
          console.log(err);
        });
        self.photos.reverse();
        imageLoader.dismiss();
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
