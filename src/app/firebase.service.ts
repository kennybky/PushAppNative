import { Injectable } from '@angular/core';
import * as firebase from 'nativescript-plugin-firebase';
import { Message } from 'nativescript-plugin-firebase';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor() { 
  
  }


  private onMessageReceivedCallback = (message: Message) => {
    console.log(`Title: ${message.title}`);
    console.log(`Body: ${message.body}`);
    // if your server passed a custom property called 'foo', then do this:
    console.log(`Value of 'foo': ${message.data.foo}`);
  }

  private onPushTokenReceivedCallback = (token: string) =>{
    console.log(token);
  }

  public initializeFirebase() {
    firebase.init({
      showNotificationsWhenInForeground: true,
      onMessageReceivedCallback: this.onMessageReceivedCallback,
      onPushTokenReceivedCallback: this.onPushTokenReceivedCallback,
    }).then(
      () => {
        console.log("firebase.init done");
        this.getToken();
      },
      error => {
        console.log(`firebase.init error: ${error}`);
      }
    );

    // firebase.addOnMessageReceivedCallback(this.onMessageReceivedCallback);
    // firebase.addOnPushTokenReceivedCallback(this.onPushTokenReceivedCallback);
  }

  async getToken(): Promise<string> {
    
     const token = await firebase.getCurrentPushToken()
        // may be null if not known yet
        console.log(`Current push token: ${token}`);
        return token;
  }
}
