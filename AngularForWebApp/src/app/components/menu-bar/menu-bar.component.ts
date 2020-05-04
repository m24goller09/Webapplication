import { Component, OnInit, Input } from '@angular/core';
import { ServerDataService } from '../../services/server-data.service';
import { AuthService } from '../core/authentication/auth.service';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent {
	@Input() title:string;
	filter: string;
	allowed:boolean;
	private subscription:Subscription;
	private isAuthenticated: boolean;
	constructor(private dataService:ServerDataService, private authService:AuthService,private router:Router) {
	}

	ngOnInit(): void {
		this.allowed=true;
		// running parameter as an observable
		//this.dataService.currentRunning.subscribe(currentRunning => this.running = currentRunning);
		this.subscription = this.authService.authNavStatus$.subscribe(status => this.allowed = status);
		if (this.subscription) {
			//this.allowed = false;
		}

	}

	async signout() {
		try{
			console.log('Signout');
			await this.authService.signout();
			await this.router.navigate(['']);
		}
		catch(er){
			console.log(er);
		}
	}

	onLogin() {
		console.log("Login");
		this.authService.login().then(r =>{
			console.log("menu-bar:");
			console.log(r)
		});
	}
}
