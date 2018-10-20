import { Component, OnInit, Input, ViewChildren, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { Message } from '../models/message';
import { BankService } from './services/bank.service';
// import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-chatboxpage',
  templateUrl: './chatboxpage.component.html',
  styleUrls: ['./chatboxpage.component.css']
})
export class ChatboxpageComponent implements OnInit, AfterViewChecked, AfterViewInit {

  @ViewChild("scrollMe") private myScrollContainer: ElementRef;
  @ViewChildren('input') vc;
  myFocusVar = false;
  showSend = false;
  userMessage = '';
  botResponse: any;
  message: Message;
  messages: Message[] = [];

  /* fundtransfer variable */
  hideToAccDetails = true;
  hideFromAccDetails = true;
  fromAccount: any;
  toAccount: any;
  transferMode: any;
  transferAmt: any;

  /*Data*/



  /* cards code as string*/
  accountCard: string = `
  <div class="grey-card card-common">
  <div class="account-list">
      <div class="pull-left">
          <div class="account-type">
              <fa name="bank" class="visa"></fa>Savings Account</div>
          <div class="acc-num">10000000034</div>
      </div>
      <div class="pull-right acc-amt">
          <span style="font-size:13px;vertical-align: text-top;">&#x20b9;</span> 28,000</div>
  </div>
</div>
  `;
  loanCard: string = `
  <div class="grey-card card-common">
  <div class="account-list">
      <div class="pull-left">
          <div class="account-type">
              <fa name="automobile" class="visa"></fa>Auto Loan</div>
          <div class="acc-num">XXXXXXXX34</div>
      </div>
      <div class="pull-right acc-amt-red">
          <span style="font-size:13px;vertical-align: text-top;">&#x20b9;</span> 2,00,000</div>
  </div>
  <div class="row emi-details">
      <div class="col-half">
          <div class="progress" data-percentage="50">
              <span class="progress-left">
                  <span class="progress-bar"></span>
              </span>
              <span class="progress-right">
                  <span class="progress-bar"></span>
              </span>
              <div class="progress-value">
                  <div>
                      50%
                  </div>
              </div>
          </div>
      </div>
      <div class="col-half loan-details text-center">
          <div>
              <span class="pull-left">Loan Amount</span>
              <span class="pull-right">&#x20b9; 4,00,000</span>
          </div>
          <div>
              <span class="pull-left">EMI Amount</span>
              <span class="pull-right">&#x20b9; 10,000</span>
          </div>
          <div>
              <span class="pull-left">Next Due Date</span>
              <span class="pull-right">12/05/2018</span>
          </div>
      </div>
  </div>
</div>
  `;
  creditCard: string = `
  <div class="grey-card card-common">
  <div class="account-list">
      <div class="pull-left">
          <div class="account-type">
              <fa name="cc-visa" class="visa"></fa> Platinum
          </div>
          <div class="acc-num">XXXX XXXX XXXX 2345</div>
      </div>
      <div class="pull-right acc-amt-red">
          <span style="font-size:13px;vertical-align: text-top;">&#x20b9;</span> 25,000</div>
  </div>
  <div id="myProgress">
      <div id="myBar">
      </div>
      <div class="limit pull-right ">
          <p>Credit</p>
          <p>&#x20b9; 30,000</p>
      </div>
      <div class="limit pull-left">
          <p>Available</p>
          <p>&#x20b9; 5,000</p>
      </div>
  </div>
</div>
  `;

  constructor(private chatService: BankService) {
  }

  ngOnInit() {
    this.scrollToBottom();
    this.sendMessage(false);
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  ngAfterViewInit() {
    this.vc.first.nativeElement.focus();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  sendMessage(display) {
    if (display) {
      this.message = new Message(this.userMessage, false, 'text');
      this.messages.push(this.message);
    } else {
      this.userMessage = "login";
    }
    this.chatService.invokeBotMsgs(this.userMessage).subscribe(res => {
      this.botResponse = res;
      let speech = this.botResponse.result[0].speech;
      if (this.botResponse.result[1]) {
        let items = [];
        for (let child of this.botResponse.result[1].items) {
          items.push(child.title + " : " + child.description + "</br>");
        }
        speech = speech + "</br>" + items;
      }
      this.message = new Message(speech, true, 'text');
      this.messages.push(this.message);
    });
    this.userMessage = '';
  }

  addSelectedAsUserInput(getMessage) {
    console.log(getMessage.content);
    this.messages.push(getMessage);
    setTimeout(() => {
      switch (getMessage.content) {
        case 'Account Balance':
          this.message = new Message(this.accountCard, true, 'card');
          this.messages.push(this.message);
          break;
        case 'Fund Transfer':
          this.message = new Message('Fund', true, 'fund');
          this.messages.push(this.message);
          break;
        // case 'Confirm Transfer':
        //   this.message = new Message(this.thankyou, true, 'card');
        //   this.messages.push(this.message);
        //   break;
        case 'Savings Account':
          this.callDialogService('Savings Account');
          break;
        case 'Current Account':
          this.callDialogService('Current Account');
          break;
        case 'NEFT':
        case 'RTGS':
        case 'IMPS':
          this.callDialogService('IMPS');
          break;
        case 'Nyal Fernandes':
        case 'Abhishek Gupta':
        case 'Tapendra Godara':
        case 'Dipesh Malvia':
        case 'Sheldon Fernandes':
        case 'Neha Sharma':
          this.callDialogService('Nyal Fernandes');
          break;
        case 'Credit Cards':
          this.message = new Message(this.creditCard, true, 'card');
          this.messages.push(this.message);
          break;
        case 'Loan Details':
          this.message = new Message(this.loanCard, true, 'card');
          this.messages.push(this.message);
          break;
        case 'Pay Bills':
          alert('Pay Bills');
          break;
        case 'Create FD/ RD':
          alert('Create FD/ RD');
          break;
      }
    }, 2000);
  }
  callDialogService(messageSelected) {
    console.log('From Service Call' + messageSelected);
    this.userMessage = messageSelected;
    this.chatService.invokeBotMsgs(this.userMessage).subscribe(res => {
      this.botResponse = res;
      let speech = this.botResponse.result[0].speech;
      if (this.botResponse.result[1]) {
        let items = [];
        for (let child of this.botResponse.result[1].items) {
          items.push(child.title + " : " + child.description + "</br>");
        }
        speech = speech + "</br>" + items;
      }

      this.message = new Message(speech, true, 'text');
      this.messages.push(this.message);
      console.log(this.botResponse);
    });
    this.userMessage = '';
  }

}



