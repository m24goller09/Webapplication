import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../core/authentication/auth.service';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.css']
})
/**
 * Component to handle the redirect from the authentification-server
 * redirects to the home-page if user is succesfully logged in
 */
export class AuthCallbackComponent implements OnInit {

	error: boolean;

	constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

	ngOnInit() {
		console.log("Auth-Callback");
		// check for error
		if (this.route.snapshot.fragment.indexOf('error') >= 0) {
			this.error = true;
			throw new Error("Error in auth-callback.component.ts line:21");
		}
		this.authService.completeAuthentication().then(value => {
			this.router.navigate(['/home/def']);
		});
	}
}
