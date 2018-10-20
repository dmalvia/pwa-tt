import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ChatboxpageComponent } from './chatboxpage/chatboxpage.component';
import { AccountsComponent } from './dashboard/accounts/accounts.component';
import { FundtransferComponent } from './dashboard/fundtransfer/fundtransfer.component';
import { MycardsComponent } from './dashboard/mycards/mycards.component';
import { LocateAtmComponent } from './locate-atm/locate-atm.component';
import { TransactionsAuthorizeComponent } from './dashboard/transactions-authorize/transactions-authorize.component';



const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'locate-atm', component: LocateAtmComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'accounts',
        component: AccountsComponent
      },
      {
        path: 'fundtransfer',
        component: FundtransferComponent
      },
      {
        path: 'mycards',
        component: MycardsComponent
      },
      {
        path: 'txnauthorize',
        component: TransactionsAuthorizeComponent
      }
    ]
  },
  { path: 'chatbox', component: ChatboxpageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})



export class AppRoutingModule { }
