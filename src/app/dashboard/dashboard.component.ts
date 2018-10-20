import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { SharingService } from '../services/sharing.service';
import { Subscription } from 'rxjs/Subscription';
import { Router, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewChecked {
  floatingOption: boolean = true;
  subscription: Subscription;
  showOptions = false;
  hidefloatingDiv: boolean = true;
  router: any;
  userRole:string;
  selectedBanking:string;
  constructor(private _router: Router, private sharingService: SharingService) {
    this.router = _router
    // this.subscription = this.ds.getData().subscribe(x => {
    //   this.floatingOption = x;
    // })
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .do(event => console.log(event))
      .subscribe(event => {
        if (event.url == '/dashboard/fundtransfer') {
          this.hidefloatingDiv = false;
        }
        else {
          this.hidefloatingDiv = true;
        }
      });
  }

  ngOnInit() {

    
    this.userRole = localStorage.getItem('userRole');
    this.sharingService.optSelected.subscribe((res:string) => {
      this.selectedBanking = res;
    })
  }

  ngAfterViewChecked() {
    //this.showFloatingBtnFun();
  }


  openOptions = () => {
    this.showOptions = !this.showOptions;
  }
}
