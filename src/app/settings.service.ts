import { Injectable } from '@angular/core';
import { AppPreferences } from '@ionic-native/app-preferences/ngx';

const defaultAddress :string = "192.168.1.92";
const defaultPort :number = 23;

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private _Address :string = defaultAddress;
  private _Port :number = defaultPort;

  constructor(private appPreferences : AppPreferences) { 
    console.log("SettingsService constructed");
    this.appPreferences.fetch("Address")
      .then((address) => {
        this._Address = address || defaultAddress;
        console.log(`Address loaded from preferences: ${this._Address}`);
      })
      .catch((reason) => {console.error(`Couldn't load Address from preferences: ${reason}`)});
    
      this.appPreferences.fetch("Port")
        .then((val) => {
          this._Port = val || defaultPort;
          console.log(`Port loaded from preferences: ${this._Port}`);
        })
        .catch((reason) => {console.error(`Couldn't load Port from preferences: ${reason}`)});
  }

  get Address() :string {
    return this._Address;
  }

  set Address(newAddress :string) {
    this._Address = newAddress;
    this.appPreferences.store("Address", newAddress)
      .then((val) => {console.log("New address value stored in preferences")})
      .catch((reason) => {console.error(`Couldn't store Address in preferences: ${reason}`)});
    console.log("SettingsService.Address property set");
  }

  get Port() :number {
    return this._Port;
  }

  set Port(newPort :number) {
    this._Port = newPort;
    this.appPreferences.store("Port", newPort.toString())
      .then((val) => {console.log("New port value stored in preferences")})
      .catch((reason) => {console.error(`Couldn't store Port in preferences: ${reason}`)});
    console.log("SettingsService.Port property set");
  }
}
