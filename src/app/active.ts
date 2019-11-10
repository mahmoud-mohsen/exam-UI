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
        if (this.firebaseService.isLoggedIn !== true) {
            this.router.navigate(['login'])
        }

        if (this.activeUser.type) {

            const authorisedType = activatedRouteSnapshot.data.expectedType;
            if(authorisedType){
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
            }else{
                alert('No authorized type define for this page');
                this.router.navigate(['']);

            }

            
        } else {
            alert('user has no type');
            this.router.navigate(['']);
        }

        return true;
    }
}