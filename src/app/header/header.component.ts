import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuth: boolean;

  constructor(private authService: AuthService) { }

  // Observe l'état de l'authentification de l'utilisateur
  // A chaque changement d'état, la fonction passée en argument est executée
  // Si l'utilisateur est bien authentifié, onAuthStateChanged() recoit l'objet de type firebase.User correspondant à l'utilisateur
  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user) {
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      }
    )
  }

  // Déconnection
  onSignOut() {
    this.authService.signOutUser();
  }

}
