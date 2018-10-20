import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { } from '@types/googlemaps';

declare var google: any;
@Component({
  selector: 'app-locate-atm',
  templateUrl: './locate-atm.component.html',
  styleUrls: ['./locate-atm.component.css']
})
export class LocateAtmComponent implements OnInit {
  self = this;
  @ViewChild('gmap') gmapElement: any;
  @ViewChild('divHeight') dHeight: ElementRef;
  map: google.maps.Map;
  lat: number;
  long: number;
  heightDiv: number;
  constructor() { }

  ngOnInit() {
    this.heightDiv = this.dHeight.nativeElement.offsetHeight - 90;
    console.log(this.dHeight.nativeElement.offsetHeight);

    if ('geolocation' in navigator) {
      console.log('Hi2');
      navigator.geolocation.watchPosition(
        (position) => {
          console.log(this);
          this.lat = position.coords.latitude;
          this.long = position.coords.longitude;
          var mapProp = {
            center: new google.maps.LatLng(this.lat, this.long),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          }
          this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(this.lat, this.long),
            map: this.map,
            title: 'My Current Location'
          })
          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(19.021815, 72.837725),
            icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            map: this.map,
            title: 'ACME BANK ATM'
          })
          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(19.029422, 72.838111),
            icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            map: this.map,
            title: 'ACME BANK ATM'
          })
          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(19.019401, 72.833219),
            icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            map: this.map,
            title: 'ACME BANK ATM'
          })
        },
        (error) => {
          console.log(error);
        });
    }
    else {
      alert('Geo location Api not supported.');
    }

  }
}
