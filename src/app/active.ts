import { User } from './model/user.model';
import { ActiveUser } from './model/ActiveUser.model';
import { Observable } from 'rxjs';
import { FirebaseService } from './service/firebase.service';
import { Injectable, Injector } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
@Injectable()
export class Active implements CanActivate {

    activeUser: ActiveUser;
    constructor(private firebaseService: FirebaseService, private router: Router) {
    }

    canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        this.activeUser = JSON.parse(localStorage.getItem('user'));
        console.log(this.router.url.indexOf("signUp"));

        if (!this.activeUser && this.router.url.indexOf("signUp") == -1) {
            this.router.navigate(['login'])

        } else {

            const authorisedType = activatedRouteSnapshot.data.expectedType;
            if (authorisedType) {
                let found = false;
                for (let index = 0; index < authorisedType.length; index++) {
                    const type = authorisedType[index];
                    if (type == this.activeUser.type) {
                        found = true;
                    }
                }
                if (!found) {
                    alert('not allowed to acces this page');
                    this.router.navigate(['']);
                    return true;
                }
            } else {
                alert('No authorized type define for this page');
                this.router.navigate(['']);

            }
        }

        return true;
    }
}