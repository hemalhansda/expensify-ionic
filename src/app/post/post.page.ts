import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';
import { PostModalPage } from '../post-modal/post-modal.page';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

  constructor(private actionSheet: ActionSheetController, private photoLib: PhotoLibrary,
              private modalController: ModalController, private camera: Camera) { }

  ngOnInit() {
  }

  async presentModal(image?) {
    const modal = await this.modalController.create({
      component: PostModalPage,
      componentProps: { imageData: image ? image : 'no-image' }
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
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     const base64Image = 'data:image/jpeg;base64,' + imageData;
     this.presentModal(imageData);
    }, (err) => {
     // Handle error
     console.log('error: ', err);
    });
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
