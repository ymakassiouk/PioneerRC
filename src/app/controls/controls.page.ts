import { Component, Injectable } from "@angular/core";
import { NavController } from '@ionic/angular';

import { NetworkInterface } from '@ionic-native/network-interface/ngx';
import { SettingsService } from '../services/settings.service';
declare let Socket :any;

function Utf8ArrayToStr(array) :string {
    var out, i, len, c;
    var char2, char3;

    out = "";
    len = array.length;
    i = 0;
    while(i < len) {
    c = array[i++];
    switch(c >> 4)
    { 
      case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
        // 0xxxxxxx
        out += String.fromCharCode(c);
        break;
      case 12: case 13:
        // 110x xxxx   10xx xxxx
        char2 = array[i++];
        out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
        break;
      case 14:
        // 1110 xxxx  10xx xxxx  10xx xxxx
        char2 = array[i++];
        char3 = array[i++];
        out += String.fromCharCode(((c & 0x0F) << 12) |
                       ((char2 & 0x3F) << 6) |
                       ((char3 & 0x3F) << 0));
        break;
    }
    }

    return out;
}

@Injectable()
@Component({
    selector: 'app-controls',
    templateUrl: 'controls.page.html',
    styleUrls: ['controls.page.scss'],
})
export class ControlsPage {

    socket :any;

    constructor(public navCtrl: NavController, private networkInterface :NetworkInterface, private settingsService :SettingsService) { 
        if (typeof Socket === 'function') {
          this.socket = new Socket();
          this.socket.onData = this.socketOnData;
          this.socket.onClose = this.socketOnClose;
        }
    }


    private socketOnClose(hasError :boolean) {
        if (hasError) {
            console.error("socket closed with error");
        } else {
            console.log("socket closed without error");
        }
    }

    private socketOnError(message :string) {
        console.error("error registered: " + message);
    }

    private socketOnData(data) {
        // VOL110 = 25.5dB
        // VOL111 = 25.0dB


        /*
        Sending: PO

controls-controls-module.js:154 received: PWR0

controls-controls-module.js:154 received: LM0401
AUA00000011000010110000010001111111111101000100000000
AUB00011111111000101110011110111111111110111100000000
LM0401
LM0401
FL022020202020205456202020202020
FN05
*/
        console.log("received: " + Utf8ArrayToStr(data));
    }

    private ensureSocketOpen() {

        if (this.socket.state == Socket.State.OPENED) {
            return;
        }

        this.socket.open(
            this.settingsService.Address,
            this.settingsService.Port,
            function(something) {
                console.log("socket open");
            },
            function(errorMessage) {
              console.error("error opening socket: " + errorMessage);
            });
    }

    private endTransmission() {
        // this.socket.shutdownWrite();
        // console.log("FIN");
    }

    private sendToDevice(message :string) {
        if (this.socket == undefined) {
            console.error("socket is not defined")
            return;
        }
        this.ensureSocketOpen();
        message = message + "\r\n";
        console.log("Sending: " + message);

        var data = new Uint8Array(message.length);
        for (var i = 0; i < data.length; i++) {
          data[i] = message.charCodeAt(i);
        }

        this.socket.write(data)

        this.endTransmission();
    }

    public clickOn(event) {
        this.sendToDevice("PO");
    }

    public clickOff(event) {
        this.sendToDevice("PF");
    }

    public clickVolumeDown(event) {
        this.sendToDevice("VD");
    }

    public clickVolumeUp(event) {
        this.sendToDevice("VU");
    }

    public clickInput7(event) {
        this.sendToDevice("34FN");
    }
}