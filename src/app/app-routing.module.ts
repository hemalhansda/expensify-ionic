import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';
import { Tab1Page } from './tab1/tab1.page';
import { HomePage } from './home/home.page';

const routes: Routes = [
  { path: '', loadChildren: './login-reg/login-reg.module#LoginRegPageModule' },
  { path: 'home', component: HomePage },
  { path: 'tab1', component: Tab1Page }
  // { path: 'login-reg', loadChildren: './login-reg/login-reg.module#LoginRegPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
