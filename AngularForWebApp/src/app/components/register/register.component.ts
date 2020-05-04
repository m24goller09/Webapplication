import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators'
import { AuthService } from '../core/authentication/auth.service';
import { UserRegistration } from '../shared/models/user.registration';
import { ServerDataService} from '../../services/server-data.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

	success: boolean;
	error: string;
	userRegistration: UserRegistration = { name: '', email: '', password: '' };
	submitted: boolean = false;

	constructor(private authService: AuthService, private dataService: ServerDataService) {

	}

	ngOnInit() {
	}

	onSubmit() {
		this.authService.register(this.userRegistration)
			.pipe(finalize(() => {
			}))
			.subscribe(
				result => {
					if (result) {
						this.success = true;
						console.log(result);
						this.dataService.addUser(result['email'], result['name']);
					}
				},
				error => {
					this.error = error;
				});
	}

	onLogin() {
		console.log("Login");
		this.authService.login();
	}
}
