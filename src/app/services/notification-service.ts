import { Injectable, Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { mergeMapTo, take, map} from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import * as firebase from 'firebase';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';


@Injectable()
  // @Component({
  //   selector: 'app-root',
  //   template: `<h1><a (click)="onClick()">Click</a></h1><div toastContainer></div>`
  // })

// export class AppComponent implements OnInit {
//   @ViewChild(ToastContainerDirective) toastContainer: ToastContainerDirective;

//   constructor(private toastrService: ToastrService) { }
//   ngOnInit() {
//     this.toastrService.overlayContainer = this.toastContainer;
//   }
//   onClick() {
//     this.toastrService.success('in div');
//   }
// }

export class MessagingService {
  payload: any;
  users: any;
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  currentMessage = new BehaviorSubject(null);

  constructor(
    private angularFireDB: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth,
    private toastr: ToastrService,
    private angularFireMessaging: AngularFireMessaging) {
    this.angularFireMessaging.messaging.subscribe(
      (_messaging) => {
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      }
    )
  }

  showNotification(title, body) {
    this.toastr.info(body, title, {
      timeOut: 5000,
      closeButton: true,
      progressBar:true,
      progressAnimation: 'increasing',
      positionClass: 'toast-bottom-right'
    });
  }

  /**
   * update token in firebase database
   * 
   * @param userId userId as a key 
   * @param token token as a value
   */
  updateToken(userId, token) {
    // we can change this function to request our backend service
    this.angularFireAuth.authState.pipe(take(1)).subscribe(
      () => {
        const data = {};
        data[userId] = token
        this.angularFireDB.object('fcmTokens/').update(data);
        this.itemsRef = this.angularFireDB.list('fcmTokens');
        this.items = this.itemsRef.snapshotChanges();
        this.items.subscribe(res => { 
          this.users = res;
          localStorage.setItem('usersData', JSON.stringify(this.users));
           }
          ); 
      })
  }

  /**
   * request permission for notification from firebase cloud messaging
   * 
   * @param userId userId
   */
  requestPermission(userId) {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        console.log(token);
        localStorage.setItem("tokenKey", token);
        this.updateToken(userId, token);
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }

  /**
   * hook method when new notification received in foreground
   */
  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
      this.payload = payload;
        
        console.log("new message received. ", payload);
            let options = {
            body: this.payload.notification.body,
            icon: '../assets/alert.png',
            badge: '../assets/alert.png',
            onclick: this.payload.notification.click_action,
        // vibrate: [200, 100, 200, 100, 200, 100, 200],
        tag: 'vibration-sample'
         };
         let title = this.payload.notification.title;
        let url = this.payload.notification.click_action;
        this.showNotification(title, options.body);
        this.currentMessage.next(payload);

        // return self.registration.showNotification("test", payload);
        let notification = new Notification(title, options);

      notification.onclick = function() {
          window.open(url, '_blank');
            parent.focus();
            window.focus(); //just in case, older browsers
            // this.close();
      };

      })
  }
}