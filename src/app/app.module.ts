import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
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
    DepositPage
  ],
  entryComponents: [],
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
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
