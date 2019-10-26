import { User } from './../model/user.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  user: any;
  constructor(public afAuth: AngularFireAuth, public router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    });
  }
  login(email: string, password: string) {

    this.afAuth.auth.signInWithEmailAndPassword(email, password).then((res) => {
      localStorage.setItem('user', JSON.stringify(res));

      this.user = localStorage.getItem('user');

      this.router.navigate(['']);

    }).catch((error) => {
      alert("Error!" + error.message);
    });



  }

  logout() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
    })
  }

  // Returns true if user is logged in
  l:boolean;
  isLogin(){
    return this.afAuth.authState;
  }

}
