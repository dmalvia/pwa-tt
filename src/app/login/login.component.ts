import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SharingService } from '../services/sharing.service';
import { MessagingService } from "../services/notification-service";
import { Location } from '@angular/common'

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	message: any;
	model: any = {};
	router: Router;
	loading = false;

	constructor(private messagingService: MessagingService, _router: Router, private shareService: SharingService, private location: Location) {
		this.router = _router;
	}

	ngOnInit() {
		this.messagingService.receiveMessage()
		this.message = this.messagingService.currentMessage
	}

	gotoDashboard = () => {
		this.loading = true;
		if ((this.model.username == "admin" || this.model.username == "Admin") && (this.model.password == "admin")) {
			this.shareService.bankingOpt('retail');
			this.messagingService.requestPermission('retail');
			this.router.navigate(['/dashboard/accounts']);
		}
		else if((this.model.username == "corp" || this.model.username == "Corp") && (this.model.password == "corp")) {
			this.shareService.bankingOpt('corporate');
			this.messagingService.requestPermission('checker');
			localStorage.setItem("user","checker");
			// this.location.back();
			if (localStorage.getItem('url').includes('txnauthorize')) {
				this.router.navigate(['/dashboard/txnauthorize']);
				localStorage.removeItem('url');	
			} else{
				this.router.navigate(['/dashboard/accounts']);
			}
			
		}
		else if((this.model.username == "corpretail" || this.model.username == "Corpretail") && (this.model.password == "corpretail")) {
			this.shareService.bankingOpt('retail');
			this.messagingService.requestPermission('maker');
			localStorage.setItem("user","maker");
			this.shareService.displayOpt(true);
			// this.location.back();

			if (localStorage.getItem('url').includes('txnauthorize')) {
				this.shareService.bankingOpt('corporate');
				this.router.navigate(['/dashboard/txnauthorize']);
				localStorage.removeItem('url');
			} else {
				this.router.navigate(['/dashboard/accounts']);
			}
		} else {
			alert("please enter valid credentials");
		}

	}
	

}

