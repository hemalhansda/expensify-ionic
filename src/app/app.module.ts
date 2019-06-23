import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, ActionSheetController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TabsPage } from './tabs/tabs.page';
import { Tab1Page } from './tab1/tab1.page';
import { HomePage } from './home/home.page';
import { Tab2Page } from './tab2/tab2.page';
import { Tab3Page } from './tab3/tab3.page';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { RegisterPage } from './register/register.page';
import { FormsModule } from '@angular/forms';
import { WithdrawalPage } from './withdrawal/withdrawal.page';
import { DepositPage } from './deposit/deposit.page';
import { HistoryPage } from './history/history.page';
import { MembersPage } from './members/members.page';
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth/ngx';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';
import { PostPage } from './post/post.page';
import { PostModalPage } from './post-modal/post-modal.page';
import { Camera } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Base64 } from '@ionic-native/base64/ngx';

@NgModule({
  declarations: [
    AppComponent,
    TabsPage,
    Tab1Page,
    Tab2Page,
    Tab3Page,
    HomePage,
    RegisterPage,
    WithdrawalPage,
    DepositPage,
    HistoryPage,
    MembersPage,
    PostPage,
    PostModalPage
  ],
  entryComponents: [
    PostModalPage
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FingerprintAIO,
    AndroidFingerprintAuth,
    ActionSheetController,
    PhotoLibrary,
    WebView,
    Camera,
    File,
    FilePath,
    Base64,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
