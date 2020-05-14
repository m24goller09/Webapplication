import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

	//constructor(private router: Router, private authService: AuthService) { }

	constructor(private authService: AuthService) { }

	canActivate(): boolean {
		if(this.authService.isAuthenticated()) {
			return true;
		}

		this.authService.login();
		return false;
	}
	/*
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		if (this.authService.isAuthenticated()) { return true; }
		this.router.navigate(['/login'], { queryParams: { redirect: state.url }, replaceUrl: true });
		return false;
	}
	*/
}
