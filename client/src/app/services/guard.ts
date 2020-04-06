import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class Authenticated implements CanActivate {
	constructor(private router: Router) {}
	canActivate(){
		if ( localStorage.getItem('waw_user') ) {
			return true;
		} else {
			return this.router.navigate(['/login']);
		}
	}

}

@Injectable()
export class Guest implements CanActivate {
	constructor(private router: Router) {}
	canActivate(){
		if (localStorage.getItem('waw_user')) {
			return this.router.navigate(['/'])
		} else {
			return true;
		}
	}
}