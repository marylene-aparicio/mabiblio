import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {

    // API de Firebase
    const firebaseConfig = {
      apiKey: 'AIzaSyBGZPwMM36G8wmmrEZx5d2ZcWcB_VsS4eE',
      authDomain: 'mabiblio-5a9b1.firebaseapp.com',
      databaseURL: 'https://mabiblio-5a9b1.firebaseio.com',
      projectId: 'mabiblio-5a9b1',
      storageBucket: 'mabiblio-5a9b1.appspot.com',
      messagingSenderId: '726362058680',
      appId: '1:726362058680:web:a256afc5f243ba2e0f294d'
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
