import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//import { NetworkInterface } from '@ionic-native/network-interface';

import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { NetworkInterface } from '@ionic-native/network-interface/ngx';
import { AppPreferences } from '@ionic-native/app-preferences/ngx';
import { AvStateService } from './services/av-state.service';





@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,  
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NetworkInterface,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AppPreferences,
    AvStateService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
