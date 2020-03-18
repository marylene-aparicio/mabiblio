import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  // vérification de l'autentification asynchrone qui retourne une promise
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(
      // Si l'utilisateur est authentifié renvoie true
      (resolve, reject) => {
        firebase.auth().onAuthStateChanged(
          (user) => {
            if(user) {
              resolve(true);
              // Sinon renvoie false
            } else {
              this.router.navigate(['/auth', 'signin']);
              resolve(false);
            }
          }
        );
      }
    );
  }

}
