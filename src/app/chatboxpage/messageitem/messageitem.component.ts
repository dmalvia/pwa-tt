import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, Pipe, PipeTransform } from '@angular/core';
import { Message } from '../../models/message';
import { DomSanitizer } from '@angular/platform-browser'

@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) { }
  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}

@Component({
  selector: 'app-messageitem',
  templateUrl: './messageitem.component.html',
  styleUrls: ['./messageitem.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MessageitemComponent implements OnInit {
  @Input() message: Message;
  @Output() selectedMessage = new EventEmitter<Message>();

  suggestionArr: any = [
    { action: 'Account Balance' },
    { action: 'Fund Transfer' },
    { action: 'Credit Cards' },
    { action: 'Loan Details' },
    { action: 'Pay Bills' },
    { action: 'Create FD/ RD' },
  ];

  constructor() { }

  ngOnInit() {
    if (this.message.content == 'Please select account from which you want to initiate transfer ?') {
      this.suggestionArr = [
        { action: 'Savings Account' },
        { action: 'Current Account' }
      ];
    } else if (this.message.content == 'Please choose the transfer mode ?') {
      this.suggestionArr = [
        { action: 'NEFT' },
        { action: 'RTGS' },
        { action: 'IMPS' }
      ];
    } else if (this.message.content == 'Please select payee account ?') {
      this.suggestionArr = [
        { action: 'Nyal Fernandes' },
        { action: 'Abhishek Gupta' },
        { action: 'Tapendra Godara' },
        { action: 'Dipesh Malvia' },
        { action: 'Sheldon Fernandes' },
        { action: 'Neha Sharma' }
      ];
    }
    console.log(this.message.content);
  }

  makeAction(actionItem) {
    if (actionItem == 'Confirm Transfer') {
      this.selectedMessage.emit(new Message(actionItem, false, 'text'));
    }
    else {
      this.selectedMessage.emit(new Message(actionItem.action, false, 'text'));
    }

  }

  getTransVal(TransferVal) {
    this.makeAction(TransferVal);
  }

}

@Component({
  selector: 'app-fund',
  template: `<div class="grey-card card-common transfer-card">
  <div style="overflow:hidden; margin-bottom:10px;">
    <div class="account-list">
      <div class="account-type">
        From
      </div>
    </div>
    <div class="select-acc">
      <select [(ngModel)]="fromAccount" class="custom-select" (change)="onChange($event.target.value,'from')">
        <option [ngValue]="undefined" selected disabled>Select Account</option>
        <option *ngFor="let item of fromAccounts" [ngValue]="item">{{item.accName}} ({{item.accNum}})</option>
      </select>
    </div>
    <div class="select-acc-details" [hidden]="hideToAccDetails">
      <div class="pull-left">
        <span>Account Number</span>
        <span style="color:#b6b8ba">{{fromAccount.accNum}}</span>
      </div>
      <div class="pull-right">
        <span>Available Balance</span>
        <span>&#8377; 10,000</span>
      </div>
    </div>
  </div>
  <div style="overflow:hidden;margin-bottom:10px;">
    <div class="account-list">
      <div class="account-type">
        Mode
      </div>
    </div>
    <div class="select-acc">
      <select [(ngModel)]="transferMode" class="custom-select" (change)="onChange($event.target.value,'mode')">
        <!-- <option selected>Select Account</option> -->
        <option [ngValue]="undefined" selected disabled>Select Transfer Mode</option>
        <option selected value="neft">
          NEFT
        </option>
        <option value="imps">
          IMPS
        </option>
        <option value="rtgs">
          RTGS
        </option>
      </select>
    </div>
  </div>
  <div style="overflow:hidden;margin-bottom:10px;">
    <div class="account-type">
      Amount
    </div>
    <div class="form-row align-items-center">
      <div class="col-md-8">
        <div class="input-group mb-2">
          <div class="input-group-prepend">
            <div class="input-group-text rupee-symbol">&#8377;</div>
          </div>
          <input [(ngModel)]="transferAmt" type="number" class="form-control amount-input" id="inlineFormInputGroup" placeholder="Enter Amount">
        </div>
      </div>
    </div>
  </div>
  <div style="overflow:hidden;margin-bottom:10px;">
  <div class="account-list">
    <div class="account-type">
      To
    </div>
  </div>
  <div class="select-acc">
    <select [(ngModel)]="toAccount" class="custom-select" (change)="onChange($event.target.value,'to')">
      <option [ngValue]="undefined" selected disabled>Select Account</option>
      <option *ngFor="let item of toAccounts" [ngValue]="item">{{item.accName}} ({{item.accNum}})</option>
    </select>
  </div>
</div>
<button [disabled]="btnDisable" style="font-size: 13px;width: 100%;margin-top: 8px;" class="btn btn-primary transfer-btn " type="button " (click)="makeAction('Transfer')">Confirm Transfer</button>
</div>
<div *ngIf="btnDisable" class="grey-card card-common transfer-card">
<div class="success-msg text-center">
  <img src="assets/checkmark.png" width="50px" />
  <div>{{transferAmt | currency:"₹ ":0}}</div>
  <div style="font-size:13px;margin:10px 0;">Transaction Reference number :
    <b>TXN567890</b>
  </div>
  <div style="color:green">Successfully transfered to
    <b>{{toAccount.accName}}</b> !!</div>
</div>
</div>`,
  styles: ['.custom-select{height: calc(2rem + 2px);font-size:13px;}.account-type{font-size:15px;}.select-acc-details > div {display: inline;font-size: 13px;font-weight: 500;text-align: center;}.select-acc-details > div span {display:block;}']
})
export class FundComponent implements OnInit {
  @Output() confirmTra = new EventEmitter<string>();
  fromAccounts: any[] = [{ accName: "Savings Account", accNum: 10000000031 }, { accName: "Current Account", accNum: 10000000032 }];
  toAccounts: any[] = [{ accName: "Credit Card", accNum: 10000000234 }, { accName: "Auto Loan", accNum: 10000000235 }];
  hideToAccDetails = true;
  btnDisable = false;
  fromAccount: any;
  toAccount: any;
  transferMode: any;
  transferAmt: any;
  constructor() { }

  ngOnInit() {

  }

  makeAction(actionItem) {
    console.log(actionItem);
    this.btnDisable = true;
    // this.confirmTra.emit('Confirm Transfer');
  }

  onChange(eventVal, actionItem) {
    console.log(eventVal + " " + actionItem);
    if (actionItem == 'from') {
      this.hideToAccDetails = false;
    }
  }


}
