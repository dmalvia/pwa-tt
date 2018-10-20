import { Component, OnInit } from '@angular/core';
import { SharingService } from '../../services/sharing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transactions-authorize',
  templateUrl: './transactions-authorize.component.html',
  styleUrls: ['./transactions-authorize.component.css']
})
export class TransactionsAuthorizeComponent implements OnInit {
  selectedBanking:string;
  dummyTxn:any;
  showTab:boolean = true;
  showSummary:boolean = false;
  showFinalScreen:boolean = false;
  txnDetail:any;
  showComment:boolean = false;
  message:string;
  router:any;
  user:string;
   constructor(_router: Router, private ds: SharingService) {
    this.router = _router;
  }

  ngOnInit() {
  	this.ds.optSelected.subscribe((res:string) => {
      this.selectedBanking = res;
    });

    this.user = localStorage.getItem("user");
    console.log(this.user);

    this.dummyTxn = [
      {
        "from":"Current Account",
        "to":"FS Tech Solutions",
        "amount":"10,000",
        "mode":"RTGS",
        "remark":"testing",
        "txn": "TXN123450",
        "date":"16 Oct 2018",
        "status":"Pending",
        "colour":"orange"
      },
      {
        "from":"Current Account",
        "to":"Solutions",
        "amount":"18,000",
        "mode":"NEFT",
        "remark":"testing",
        "txn": "RQN128j650",
        "date":"10 Oct 2018",
        "status":"Pending",
        "colour":"orange"
      },
      {
        "from":"Current Account",
        "to":"DXT InfoSystem",
        "amount":"25,000",
        "mode":"NEFT",
        "remark":"testing",
        "txn": "TXN123450",
        "date":"20 Sep 2018",
        "status":"Approved",
        "colour":"green"
      },
      {
        "from":"Current Account",
        "to":"Media Temple",
        "amount":"45,000",
        "mode":"RTGS",
        "remark":"testing",
        "txn": "TXN128j650",
        "date":"10 Sep 2018",
        "status":"Approved",
        "colour":"green"
      },
      {
        "from":"Current Account",
        "to":"ABC Corporation",
        "amount":"78,000",
        "mode":"RTGS",
        "remark":"testing",
        "txn": "TXN123450",
        "date":"13 OCT 2018",
        "status":"Rejected",
        "colour":"red"
      },
      {
        "from":"Current Account",
        "to":"Media Temple",
        "amount":"45,000",
        "mode":"RTGS",
        "remark":"testing",
        "txn": "TXN128j650",
        "date":"10 Sep 2018",
        "status":"Rejected",
        "colour":"red"
      }
    ]
  }

  showAllInfo(obj) {
    this.showSummary = true;
    this.showTab = false;
    console.log("THe object is ", obj);
    this.txnDetail = obj;
  }

  backToTable() {
    this.showSummary = false;
    this.showTab = true;
    this.showFinalScreen = false;
  }

  transferDone(act) {
    this.showFinalScreen = true;
    this.showTab = false;
    this.showSummary = false;
    let token = "";
    if (this.selectedBanking == 'corporate') {
      JSON.parse(localStorage.getItem("usersData")).forEach(function(item) {
        if (item.key == 'maker') {
          token = item.payload;
          console.log("makerToken", token);
        }
      })
    }
    if(act == 'maker') {
      this.message = `Fund transfer request of ₹ ${this.txnDetail.amount} has been rejected, please initiate a new transaction!!`;
    }
    else {
    this.message = `Fund transfer request of ₹ ${this.txnDetail.amount} has been approved!!`;
    }
    this.notifunc(this.message, token);
  }

  notifunc(msg, token) {
      let obj = {
        notification: {
          title: "Fund Transfer!!",
          body: msg,
          click_action: "https://pwa-banking-tt.firebaseapp.com/dashboard/txnauthorize",
          icon: '../assets/alert.png',
          badge: '../assets/alert.png',
          vibrate: [500, 110, 500, 110, 450, 110, 200, 110, 170, 40, 450, 110, 200, 110, 170, 40, 500]
        },
        to: token
      }
    this.ds.getToken(obj).subscribe(res => {
      console.log(res);
    });
  }
  showCommentBox() {
    this.showComment = true;
  }

 navigateToAccounts() {
    this.router.navigate(['/dashboard/accounts']);
  }

  setColor(status) {
    let style;
    if(status == 'Pending') {
      style = {'color':'orange'} 
    }
    else if(status == 'Approved') {
      style = {'color':'green'}  
    }
    else {
     style = {'color':'red'} 
    }

    return style;
  }

}
