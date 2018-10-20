import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import * as firebase from 'firebase';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ChartsModule } from 'ng2-charts';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AsyncPipe } from '../../node_modules/@angular/common';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChatboxpageComponent } from './chatboxpage/chatboxpage.component';
import { AppRoutingModule } from './app-routing.module';
import { MessageitemComponent, SafeHtmlPipe, FundComponent } from './chatboxpage/messageitem/messageitem.component';
import { AccountsComponent } from './dashboard/accounts/accounts.component';
import { FundtransferComponent } from './dashboard/fundtransfer/fundtransfer.component';
import { BankService } from './chatboxpage/services/bank.service';
import { MycardsComponent } from './dashboard/mycards/mycards.component'
import { environment } from '../environments/environment.prod';
import { SharingService } from './services/sharing.service';
import { MessagingService } from './services/notification-service';
import { LocateAtmComponent } from './locate-atm/locate-atm.component';
import { TransactionsAuthorizeComponent } from './dashboard/transactions-authorize/transactions-authorize.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    ChatbotComponent,
    DashboardComponent,
    ChatboxpageComponent,
    FundComponent,
    MessageitemComponent,
    AccountsComponent,
    FundtransferComponent,
    MycardsComponent,
    SafeHtmlPipe,
    LocateAtmComponent,
    TransactionsAuthorizeComponent,
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    HttpModule,
    AngularFontAwesomeModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
      BrowserAnimationsModule, // required animations module
      ToastrModule.forRoot({ positionClass: 'inline' }),
      ToastContainerModule
  ],
  providers: [
    BankService,
    SharingService,
    MessagingService,
    AsyncPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  
}
