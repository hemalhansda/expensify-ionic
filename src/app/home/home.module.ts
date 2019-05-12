import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { TabsPage } from '../tabs/tabs.page';
import { Tab1Page } from '../tab1/tab1.page';
import { HomePageRoutingModule } from './home.router.module';
import { Tab3Page } from '../tab3/tab3.page';
import { Tab2Page } from '../tab2/tab2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [
    HomePage,
    TabsPage,
    Tab1Page,
    Tab2Page,
    Tab3Page
  ]
})
export class HomePageModule {}
