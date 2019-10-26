import { FirebaseService } from './service/firebase.service';
import { Injectable, Injector } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
@Injectable()
export class Active implements CanActivate {


    constructor(private firebaseService: FirebaseService, private router: Router) {

    }

    canActivate(): boolean {

        this.firebaseService.isLogin().subscribe(user => {
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
            } else {

                this.router.navigate(['login']);
                localStorage.setItem('user', null);
            }
        });

        return true;
    }
}