import { Component } from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx'
import { GeolocationService } from '../services/geolocation.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  latitude = 0
  longitude  = 0
  url : string;
  constructor(private geolocation: Geolocation, private gpsService:GeolocationService) {}
  option ={
    timeout : 10000,
    enableHighAccuracy:true,
    maximunAge:3600

  }

  getCurrentCoordinate(){
    this.geolocation.getCurrentPosition().then((res) =>{
      this.latitude = res.coords.latitude
      this.longitude = res.coords.longitude
      this.url = `https://maps.google.com/?q=${this.latitude},${this.longitude}`
      this.sendMessage()
    }).catch((err) =>{
      console.log("error al tener la ubicacion",err)
    })
  }

  sendMessage(): void {
    if (this.latitude !== 0 && this.longitude !== 0) {
      this.gpsService.sendCordinates(this.latitude, this.longitude).then(() => {
        this.latitude = 0;
        this.longitude = 0;
      });
    }
  }

}
