import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AvStateService {

  public Volume :number;

  private startsWith(str, word) {
    return str.lastIndexOf(word, 0) === 0;
  }

  public parseDeviceMessage(sMessage :string) 
  {
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
    sMessage = sMessage.toUpperCase();

    if (this.startsWith(sMessage, "VOL")) 
    {
      this.Volume = Number.parseInt(sMessage.substring(3));
    }
  }

  constructor() { }
}
