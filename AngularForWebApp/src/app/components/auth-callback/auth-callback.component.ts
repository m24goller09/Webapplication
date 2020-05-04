import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../core/authentication/auth.service';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.css']
})
export class AuthCallbackComponent implements OnInit {

	error: boolean;

	constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

	async ngOnInit() {
		console.log("Auth-Callback");
		// check for error
		if (this.route.snapshot.fragment.indexOf('error') >= 0) {
			this.error = true;
			return;
		}
		console.log(this.route.snapshot.data);
		await this.authService.completeAuthentication();
		this.router.navigate(['/home/def']);
	}
}
