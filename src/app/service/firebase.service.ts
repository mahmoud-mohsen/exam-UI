import { UserService } from './user.service';
import { ActiveUser } from '../model/ActiveUser.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  activeUser: ActiveUser;

  constructor(
    private afAuth: AngularFireAuth, // Inject Firebase auth service
    private router: Router,
    private userService: UserService
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.activeUser = new ActiveUser();

    this.afAuth.authState.subscribe(async (user) => {
      if (user) {
        const info = await user.getIdTokenResult();
        this.activeUser.type = info.claims.type;
        this.activeUser.id = info.claims.userId;
        this.activeUser.displayName = user.displayName;
        localStorage.setItem('user', JSON.stringify(this.activeUser));

      } else {
        localStorage.setItem('user', null);
      }
    })
  }



  login(email: string, password: string) {

    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(async (result) => {
        const info = await result.user.getIdTokenResult();
        this.activeUser.type = info.claims.type;
        this.activeUser.id = info.claims.userId;
        this.activeUser.displayName = result.user.displayName;
        localStorage.setItem('user', JSON.stringify(this.activeUser));
        this.userService.getLoggedInUserDetails();
        window.location.href = '';


      }).catch(function (error) {
        alert(error.message);
      });
  }

  logout() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      window.location.href = '';
    })
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }

  setUserTypeFromClaims() {
    this.afAuth.auth.currentUser.getIdTokenResult()
      .then((idTokenResult) => {
        this.activeUser.type = idTokenResult.claims.type;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  setUserIdFromClaims() {
    this.afAuth.auth.currentUser.getIdTokenResult()
      .then((idTokenResult) => {
        this.activeUser.id = idTokenResult.claims.userId;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getUser() {
    return this.activeUser;
  }

}