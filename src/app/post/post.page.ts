import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController, NavController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';
import { PostModalPage } from '../post-modal/post-modal.page';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { RestService } from '../rest.service';

declare var cordova: any;

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

  constructor(private actionSheet: ActionSheetController, private photoLib: PhotoLibrary,
              private modalController: ModalController, private camera: Camera, private webView: WebView,
              private navCtrl: NavController, private file: File,
              private filePath: FilePath, private toastCtrl: ToastController, private platform: Platform,
              private loadingCtrl: LoadingController, private rest: RestService) { }

  ngOnInit() {
    this.showLoader = true;
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

  // Create a new name for the image
  private createFileName() {
    const d = new Date(),
    n = d.getTime(),
    newFileName =  n + '.jpg';
    return newFileName;
  }

  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    console.log(`copyfile(${namePath}, ${currentName}, ${cordova.file.dataDirectory}/${this.file.dataDirectory}, ${newFileName})`);
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
      console.log('lastImage: ', this.lastImage);
      const targetPath = this.pathForImage(this.lastImage);
      this.presentModal(this.originalImage, targetPath);
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }

  private presentToast(text) {
    const toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    // toast.present();
  }

  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      console.log(111111);
      return '';
    } else {
      console.log(222222);
      return cordova.file.dataDirectory + img;
    }
  }

  openCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imagePath) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
    //  const base64Image = 'data:image/jpeg;base64,' + imageData;
    //  const originalImage = this.webView.convertFileSrc(imagePath);
    //  this.presentModal(originalImage);
    this.filePath.resolveNativePath(imagePath)
        .then(filePath => {
          const correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
          const currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
          this.originalImage = this.webView.convertFileSrc(imagePath);
          this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
        });
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
