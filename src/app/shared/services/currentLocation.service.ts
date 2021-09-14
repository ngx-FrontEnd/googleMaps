import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentLocationService {

  constructor() { }
  getCurrentLocation() {
    let pos;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
    }
    return pos;
  }
  ngOnInit(): void {
    this.getCurrentLocation()
  }
}
