import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { SharingService } from '../services/sharing.service';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
    // Variables declaration for connection state//
    state: any;
    bannerDisplay: boolean;
    userRole:string;
    onlogin:boolean = false;
    route: Router;
    sideMenuLeft = false;
    selectedRetail:boolean = false;
    selectedCorp:boolean = true;
    constructor(_router: Router,private shareService:SharingService) {
        this.route = _router;
        window.addEventListener('online', this.handleStateChange.bind(this));
        window.addEventListener('offline', this.handleStateChange.bind(this));
    }

    goToPage(actionItem) {
        if (actionItem == 'atm') {
            this.route.navigate(['/locate-atm']);
        }
        else if (actionItem == 'login') {
            this.route.navigate(['/login']);
            localStorage.removeItem('userRole');
            localStorage.removeItem("user");
            localStorage.removeItem("flag");
            this.shareService.displayOpt(false);
        }
        this.sideMenuLeft = false;
    }

    ngOnInit() {
        this.checkConnection();        
        this.userRole = localStorage.getItem('userRole');
        console.log("THe user is ", localStorage.getItem('userRole'));

        this.shareService.status.subscribe((val:boolean) => {
            console.log("THe value from dash "+ val);
            this.onlogin = val;
        });
    }

    openMenu() {
        this.sideMenuLeft = true;
    }

    closeMenu() {
        this.sideMenuLeft = false;
    }

    redirectToLogin() {
        this.route.navigate(['/login']);
        localStorage.removeItem('userRole');
        this.shareService.displayOpt(false);
    }
    checkConnection() {
        this.state = navigator.onLine ? 'online' : 'offline';
        if (this.state == 'offline') {
            this.bannerDisplay = true;
        }
    }

    handleStateChange() {
        this.bannerDisplay = true;
        this.state = navigator.onLine ? 'online' : 'offline';
        if (this.state == 'online') {
            setTimeout(function () {
                this.bannerDisplay = false;
            }.bind(this), 3000);
        }
    }

    switchUser(action) {
        if(action == 'retail') {
            // localStorage.setItem('userRole', 'retail');
            this.shareService.bankingOpt('retail');
            this.selectedRetail = false;
            this.selectedCorp = true;

        }
        else {
            // localStorage.setItem('userRole', 'corporate');
            this.shareService.bankingOpt('corporate');
            this.selectedRetail = true;
            this.selectedCorp = false;

        }
    }
}