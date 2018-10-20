import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, Headers } from '@angular/http';

@Injectable()
export class SharingService {
  private subject = new Subject<any>();
  public status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public optSelected: BehaviorSubject<string> = new BehaviorSubject<string>('retailBank');

  sendFlag(flagVal: boolean) {
    this.subject.next(flagVal);
  }

  displayOpt(value: boolean) {
        this.status.next(value);
  }

  bankingOpt(value:string) {
    this.optSelected.next(value);
  }

  getData(): Observable<any> {
    return this.subject.asObservable();
  }

  constructor(private http: Http) { }

  getToken(postObj) {

    let headers = new Headers({
      'Authorization': 'key=AAAANZLfN6Q:APA91bHPI84URU6nMgQ4GS_8FHjOlj_-MN1DjpkB2gzc_bMzg_UpOij_PXX6aILDxF7C_PfL92WIuEMZAJ9Q2I7YGEQjDlDhfvcMYGn1yxK81p3gHR-ZFR3rKV9Y0RppZAX2DN3-H64F'
    });

    let url ='https://fcm.googleapis.com/fcm/send';

    return this.http.post(url,postObj,{headers:headers})
    .map(res => {
      return res;
    })
    // .catch(error => {
    //   console.log('error', error);
    // })
  }
}
