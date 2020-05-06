import { Component, OnInit, Input } from '@angular/core';
import { ServerDataService } from '../../services/server-data.service';
import { AuthService } from '../core/authentication/auth.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit{
	@Input() title:string;
	allowed:boolean;
	private subscription: Subscription;
	constructor(private dataService:ServerDataService, private authService:AuthService,private router:Router) {
	}

	ngOnInit(): void {
		this.subscription = this.authService.authNavStatus$.subscribe(status => this.allowed = status);
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
	profileTest(){
		console.log(this.authService.getClaims());
	}
}
