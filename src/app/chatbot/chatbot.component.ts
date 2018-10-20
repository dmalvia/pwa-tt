import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from "@angular/router";
import { PlatformLocation, Location } from '@angular/common';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {
  // @Output() hideBotDiv = new EventEmitter<string>();
  public hideBotDiv: boolean = false;
  router: Router;
  constructor(_router: Router, location: PlatformLocation, private loc: Location) {
    this.router = _router;
    location.onPopState(() => {
      this.hideBotDiv = false;
    });
    // this.loc.back();
  }
  ngOnInit() {

  }

  openChatBoxPage() {
    this.hideBotDiv = true;
    this.router.navigate(['/chatbox']);
  }
}
