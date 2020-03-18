import { Injectable } from '@angular/core';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // Toues les méthodes liées à l'authentification Firebase se trouvent dans firebase.auth
  // Creer un nouvel utilisateur qui prend comme argument une adresse mail et un mdp
  createNewUser(email: string, password: string) {
    return new Promise(
      // retourne une promise qui résoud la creation si reussit
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          // rejetée si elle ne reussit pas
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  // Connecte un utilisateur deja existant
  signInUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  // Déconnecte
  signOutUser() {
    firebase.auth().signOut();
  }

}