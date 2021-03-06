import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';
import { Tab1Page } from './tab1/tab1.page';
import { HomePage } from './home/home.page';
import { Tab3Page } from './tab3/tab3.page';
import { Tab2Page } from './tab2/tab2.page';
import { RegisterPage } from './register/register.page';
import { WithdrawalPage } from './withdrawal/withdrawal.page';
import { DepositPage } from './deposit/deposit.page';
import { AuthGaurdService } from './auth-gaurd.service';
import { HistoryPage } from './history/history.page';
import { MembersPage } from './members/members.page';
import { PostPage } from './post/post.page';

const routes: Routes = [
  { path: '', loadChildren: './login-reg/login-reg.module#LoginRegPageModule' },
  {
    path: 'home',
    component: HomePage,
    canActivate: [AuthGaurdService],
    children: [
      {
        path: 'home/tab1', component: Tab1Page
      }, {
        path: 'home/tab3', component: Tab3Page
      }, {
        path: 'home/tab2', component: Tab2Page
      }, {
        path: 'home',
        redirectTo: '/home/tab1',
        pathMatch: 'full'
      }
    ]
  },
  { path: 'register', component: RegisterPage },
  { path: 'withdrawal', component: WithdrawalPage, canActivate: [AuthGaurdService] },
  { path: 'deposit', component: DepositPage, canActivate: [AuthGaurdService] },
  { path: 'history', component: HistoryPage, canActivate: [AuthGaurdService] },
  { path: 'members', component: MembersPage, canActivate: [AuthGaurdService] },
  { path: 'post', component: PostPage, canActivate: [AuthGaurdService] },
  // { path: 'home/tab1', component: Tab1Page }
  // { path: 'login-reg', loadChildren: './login-reg/login-reg.module#LoginRegPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
