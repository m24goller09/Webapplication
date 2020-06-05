import { Component, OnInit, Input } from '@angular/core';
import { ServerDataService } from '../../services/server-data.service';
import { AuthService } from '../core/authentication/auth.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Project} from '../../models/Project';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit{
	@Input() title:string;
	allowed:boolean;
	userName:string;
	email:string;
	project:Project;
	private subscription: Subscription;
	constructor(private dataService:ServerDataService, private authService:AuthService,private router:Router, private snackBar:MatSnackBar) {
	}

	/**
	 * sets 'allowed' boolean to the current AuthStatus value to toggle between different appearence-modes
	 */
	ngOnInit(): void {
		this.subscription = this.authService.authNavStatus$.subscribe(status => {
			this.allowed = status
			this.email = this.authService.getClaims()['email'];
			this.userName = this.authService.getClaims()['name'];
		});
	}

	async signout() {
		try{
			console.log('Signout');
			await this.authService.signOut();
			await this.router.navigate(['']);
		}
		catch(er){
			console.error(er);
		}
	}

	onLogin() {
		console.log("Login");
		this.authService.login().then(r =>{
			console.log("menu-bar:");
			console.log(r)
		});
	}

	/**
	 * search and open a project by its projectID.\
	 * initiates GET-Request in services
	 */
	findProject(){
		let searchID = document.getElementById('searchID') as HTMLInputElement;
		this.dataService.getProject(+searchID.value).subscribe(result => {
			this.project = ServerDataService.parseProject(result);
			window.location.href = "/projectView/" + this.project.id;
		},
		error => {
			if (error == 404 || error == 400){
				this.snackBar.open('No project with this id.','',{duration: 2000});
			}
		},
		);
	}
}
