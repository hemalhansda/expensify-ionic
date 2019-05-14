import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { Tab1Page } from '../tab1/tab1.page';
import { Tab3Page } from '../tab3/tab3.page';
import { Tab2Page } from '../tab2/tab2.page';

const routes: Routes = [
  { path: 'home', loadChildren: './tab1/tab1.module#Tab1PageModule' },
  // {
  //   path: 'home',
  //   component: HomePage,
  //   children: [
  //     {
  //       path: 'home/tab1', component: Tab1Page
  //     }, {
  //       path: 'home/tab3', component: Tab3Page
  //     }, {
  //       path: 'home/tab2', component: Tab2Page
  //     }, {
  //       path: 'home',
  //       redirectTo: '/home/tab1',
  //       pathMatch: 'full'
  //     }
  //   ]
  // }, {
  //   path: 'home',
  //   redirectTo: '/home/tab1',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}