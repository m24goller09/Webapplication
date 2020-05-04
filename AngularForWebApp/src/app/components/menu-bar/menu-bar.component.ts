import { Component, OnInit, Input } from '@angular/core';
import { ServerDataService } from '../../services/server-data.service';
import { AuthService } from '../core/authentication/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent {
	@Input() title:string;
	filter: string;
	allowed:boolean;
	constructor(private dataService:ServerDataService, private authService:AuthService,private router:Router) {
	}

	ngOnInit(): void {
		this.allowed=true;
		// running parameter as an observable
		//this.dataService.currentRunning.subscribe(currentRunning => this.running = currentRunning);
		if (window.location.href == "http://localhost:4200/" || window.location.href == "http://localhost:4200/register") {
			this.allowed = false;
		}

	}

	async signout() {
		try{
			console.log('Signout');
			await this.authService.signout();
			this.router.navigate(['']);
		}
		catch(er){
			console.log(er);
		}
	}

	onLogin() {
		console.log("Login");
		this.authService.login();
	}
}
