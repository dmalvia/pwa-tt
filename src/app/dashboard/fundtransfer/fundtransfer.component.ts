import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharingService } from '../../services/sharing.service'

@Component({
  selector: 'app-fundtransfer',
  templateUrl: './fundtransfer.component.html',
  styleUrls: ['./fundtransfer.component.css']
})
export class FundtransferComponent implements OnInit {
  router: Router
  hideToAccDetails = false;
  fromAccount: any;
  toAccount: any;
  transferMode: any;
  transferAmt: any;
  selectedBanking:string;
  userComment:any;
  txnObj:any;
  txnArr:any[] = [];

  /*Data*/
  fromAccounts: any[] = [{ accName: "SA", accNum: 10000000031 }];
  toAccounts: any[] = [{ accName: "Credit Card", accNum: 10000000234 }, { accName: "Auto Loan", accNum: 10000000235 },{ accName: "FS Tech Solutions", accNum: 1002345235 },{ accName: "Distributors", accNum: 10456700235 }];

  fromAccounts1: any[] = [{ accName: "CA", accNum: 10000000032 }];
  toAccounts1: any[] = [{ accName: "Tapendra Info", accNum: 10000000235 },{ accName: "FS Tech Solutions", accNum: 1002345235 },{ accName: "Distributors", accNum: 10456700235 }];

  stepOne = true;
  stepTwo = false;
  finalScreen = false;
  myDate: Date = new Date();
  TransferModeMsg: string = 'Funds are transferred to the credit account with the other participating Banks using RBI NEFT service. RBI acts as the service providr and transfers the credit to the other bank account.';
  constructor(_router: Router, private ds: SharingService) {
    this.router = _router;
  }

  onChange(eventVal, actionItem) {
    console.log("event ", eventVal);
    if (actionItem == 'from') {
      this.hideToAccDetails = true;
    }
    else if (actionItem == 'to') {
      // this.hideFromAccDetails = false;
    }
    else if (actionItem == 'mode' && eventVal == 'neft') {
      this.TransferModeMsg = 'The acronym "NEFT" stands for National Electronics Funds Transfer. Funds are transferred to the credit account with the other participating Banks using RBI NEFT service. RBI acts as the service providr and transfers the credit to the other bank account.';
    }
    else if (actionItem == 'mode' && eventVal == 'imps') {
      this.TransferModeMsg = 'Immediate Payment Service (IMPS) is an instant interbank electronic fund transfer service.The service is available 24x7 even on Sundays and holidays.';
    }
    else if (actionItem == 'mode' && eventVal == 'rtgs') {
      this.TransferModeMsg = 'The acronym "RTGS" stands for Real-time Gross Settlement. The system facilitates e-transfer of funds account of one bank to another on a "real-time" and on "gross settlement" basis';
    }


  }

  nextStep() {
    console.log(this.transferMode);
    if (this.toAccount == undefined || this.fromAccount == undefined || this.transferAmt == undefined || this.userComment == undefined) {
      alert('All fields are mandatory !!');
    }
    else {
      this.txnObj = {
        "from":this.fromAccount.accName,
        "to":this.toAccount.accName,
        "amount":this.transferAmt,
        "mode":this.transferMode,
        "date":this.myDate,
        "remark":this.userComment
      }
      this.stepTwo = true;
      this.stepOne = false;
    }

  }
  backEdit() {
    this.stepTwo = false;
    this.stepOne = true;
  }
  navigateToAccounts() {
    this.router.navigate(['/dashboard/accounts']);
  }
  navigateToFundT() {
    window.location.reload();
  }

  transferDone() {
    console.log("Final Screen" + this.toAccount)
    this.stepTwo = false;
    this.finalScreen = true;
    
    let token = "";
    if (this.selectedBanking == 'corporate'){
   JSON.parse(localStorage.getItem("usersData")).forEach(function(item){
     if (item.key=='checker'){
     token = item.payload;
     console.log("checkerToken", token);
     }
   })
       this.notifunc(this.txnObj, token);
    }
    console.log("The transfer object is ", this.txnObj);
    this.txnArr.push(this.txnObj);
    localStorage.setItem("txnArray", JSON.stringify(this.txnArr));
  }

  ngOnInit() {
    this.sendFlagValue();

     this.ds.optSelected.subscribe((res:string) => {
      this.selectedBanking = res;
    })
  }

  sendFlagValue() {
    this.ds.sendFlag(false);
  }

  notifunc(txnObj, token) {
    // if(localStorage.getItem('user')=='maker'){
      let obj = {
        notification: {
          title: "Fund Transfer!!",
          body: `A new transaction has been initiated of ₹ ${txnObj.amount}, please take the appropriate actions`,
          click_action: "https://pwa-banking-tt.firebaseapp.com/dashboard/txnauthorize",
          icon: '../assets/alert.png',
          badge: '../assets/alert.png',
          vibrate: [500,110,500,110,450,110,200,110,170,40,450,110,200,110,170,40,500]

        },
        to: token
      }
        this.ds.getToken(obj).subscribe(res => {
          console.log(res);
        })
    // }
  }

  showAlert() {
    alert("Payee Added successfully !!");
  }
  
}
